// scripts/build-exe.js - Compiles QueensDomain.exe using Windows built-in csc.exe compiler
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const csc = 'C:\\Windows\\Microsoft.NET\\Framework64\\v4.0.30319\\csc.exe';

if (!fs.existsSync(csc)) {
  console.error('csc.exe not found at', csc);
  process.exit(1);
}

const csharpSource = `
using System;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Windows.Forms;

namespace QueensDomainLauncher
{
    static class Program
    {
        [DllImport("user32.dll", SetLastError = true)]
        static extern int GetWindowLong(IntPtr hWnd, int nIndex);

        [DllImport("user32.dll")]
        static extern int SetWindowLong(IntPtr hWnd, int nIndex, int dwNewLong);

        [DllImport("user32.dll")]
        static extern bool SetWindowPos(IntPtr hWnd, IntPtr hWndInsertAfter, int X, int Y, int cx, int cy, uint uFlags);

        delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);

        [DllImport("user32.dll")]
        static extern bool EnumWindows(EnumWindowsProc lpEnumFunc, IntPtr lParam);

        [DllImport("user32.dll")]
        static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint lpdwProcessId);

        [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true)]
        static extern int GetWindowText(IntPtr hWnd, StringBuilder lpString, int nMaxCount);

        const int GWL_STYLE = -16;
        const int WS_CAPTION = 0x00C00000;
        const int WS_THICKFRAME = 0x00040000;
        const uint SWP_NOMOVE = 0x0002;
        const uint SWP_NOSIZE = 0x0001;
        const uint SWP_NOZORDER = 0x0004;
        const uint SWP_FRAMECHANGED = 0x0020;

        private static Process serverProcess = null;

        [STAThread]
        static void Main(string[] args)
        {
            string appDir = AppDomain.CurrentDomain.BaseDirectory;
            string serverScript = Path.Combine(appDir, "server", "server.js");

            if (!File.Exists(serverScript))
            {
                string subScript = Path.Combine(appDir, "ai-game-studio-main", "server", "server.js");
                if (File.Exists(subScript)) {
                    serverScript = subScript;
                    appDir = Path.Combine(appDir, "ai-game-studio-main");
                }
            }

            // Check if server is already running on 47831
            bool serverRunning = IsPortInUse(47831);
            if (!serverRunning && File.Exists(serverScript))
            {
                string nodePath = FindNode();
                if (!string.IsNullOrEmpty(nodePath))
                {
                    try
                    {
                        ProcessStartInfo psi = new ProcessStartInfo();
                        psi.FileName = nodePath;
                        psi.Arguments = "\\"" + serverScript + "\\"";
                        psi.WorkingDirectory = appDir;
                        psi.CreateNoWindow = true;
                        psi.UseShellExecute = false;
                        psi.WindowStyle = ProcessWindowStyle.Hidden;

                        serverProcess = Process.Start(psi);

                        // Wait up to 1.5 seconds for port to open
                        for (int i = 0; i < 15; i++)
                        {
                            Thread.Sleep(100);
                            if (IsPortInUse(47831))
                            {
                                serverRunning = true;
                                break;
                            }
                        }
                    }
                    catch { }
                }
            }

            // Target URL: connects to server if available, else local app file (never requires server to open)
            string targetUrl;
            if (serverRunning || IsPortInUse(47831))
            {
                targetUrl = "http://127.0.0.1:47831/";
            }
            else
            {
                string localHtml = Path.Combine(appDir, "app", "index.html");
                if (!File.Exists(localHtml))
                {
                    localHtml = Path.Combine(appDir, "index.html");
                }
                targetUrl = "file:///" + localHtml.Replace('\\\\', '/');
            }

            // Parse any special launcher arguments
            bool spawnMode = false;
            string spawnUrl = "https://www.spawn.co";
            foreach (string arg in args)
            {
                if (arg == "--spawn" || arg == "-s")
                {
                    spawnMode = true;
                }
                else if (arg.StartsWith("--spawn-url="))
                {
                    spawnMode = true;
                    spawnUrl = arg.Substring("--spawn-url=".Length).Trim();
                }
            }

            Process browserProc = null;
            if (spawnMode)
            {
                browserProc = LaunchBrowser("http://127.0.0.1:47831/?tab=spawnbrowser");
                LaunchBrowser(spawnUrl);
            }
            else
            {
                browserProc = LaunchBrowser(targetUrl);
            }

            // In background thread, strip WS_CAPTION to ensure a truly unified, homogeneous window
            ThreadPool.QueueUserWorkItem(state =>
            {
                for (int attempt = 0; attempt < 25; attempt++)
                {
                    Thread.Sleep(200);
                    bool stripped = false;
                    EnumWindows((hWnd, lParam) =>
                    {
                        uint procId;
                        GetWindowThreadProcessId(hWnd, out procId);
                        try
                        {
                            Process p = Process.GetProcessById((int)procId);
                            string pname = p.ProcessName.ToLower();
                            if (pname.Contains("edge") || pname.Contains("chrome"))
                            {
                                StringBuilder title = new StringBuilder(256);
                                GetWindowText(hWnd, title, 256);
                                string t = title.ToString();
                                if (t.Contains("Tome") || t.Contains("Queen") || t.Contains("47831") || t.Contains("index.html") || string.IsNullOrEmpty(t))
                                {
                                    int style = GetWindowLong(hWnd, GWL_STYLE);
                                    if ((style & WS_CAPTION) != 0)
                                    {
                                        SetWindowLong(hWnd, GWL_STYLE, style & ~WS_CAPTION);
                                        SetWindowPos(hWnd, IntPtr.Zero, 0, 0, 0, 0, SWP_NOMOVE | SWP_NOSIZE | SWP_NOZORDER | SWP_FRAMECHANGED);
                                        stripped = true;
                                        return false; // found and stripped
                                    }
                                }
                            }
                        }
                        catch { }
                        return true;
                    }, IntPtr.Zero);

                    if (stripped) break;
                }
            });
        }

        static bool IsPortInUse(int port)
        {
            try
            {
                HttpWebRequest req = (HttpWebRequest)WebRequest.Create("http://127.0.0.1:" + port + "/");
                req.Timeout = 300;
                req.Method = "GET";
                using (HttpWebResponse resp = (HttpWebResponse)req.GetResponse())
                {
                    return resp.StatusCode == HttpStatusCode.OK;
                }
            }
            catch
            {
                return false;
            }
        }

        static string FindNode()
        {
            string[] paths = {
                Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles), "nodejs", "node.exe"),
                Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86), "nodejs", "node.exe"),
                Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "Programs", "node", "node.exe")
            };

            foreach (string p in paths)
            {
                if (File.Exists(p)) return p;
            }

            string pathEnv = Environment.GetEnvironmentVariable("PATH") ?? "";
            foreach (string dir in pathEnv.Split(';'))
            {
                try
                {
                    string candidate = Path.Combine(dir.Trim(), "node.exe");
                    if (File.Exists(candidate)) return candidate;
                }
                catch { }
            }

            return null;
        }

        static Process LaunchBrowser(string url)
        {
            string edge = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86), "Microsoft", "Edge", "Application", "msedge.exe");
            if (!File.Exists(edge))
            {
                edge = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles), "Microsoft", "Edge", "Application", "msedge.exe");
            }

            string chrome = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles), "Google", "Chrome", "Application", "chrome.exe");
            if (!File.Exists(chrome))
            {
                chrome = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86), "Google", "Chrome", "Application", "chrome.exe");
            }

            // Launch wide landscape window (1560x880)
            string args = "--app=\\"" + url + "\\" --window-size=1560,880";

            try
            {
                if (File.Exists(edge))
                {
                    return Process.Start(edge, args);
                }
                else if (File.Exists(chrome))
                {
                    return Process.Start(chrome, args);
                }
                else
                {
                    return Process.Start(url);
                }
            }
            catch
            {
                return Process.Start(url);
            }
        }
    }
}
`;

const csFile = path.join(root, 'scripts', 'Launcher.cs');
const exeFile = path.join(root, 'QueensDomain.exe');

fs.writeFileSync(csFile, csharpSource, 'utf8');

console.log('Compiling QueensDomain.exe...');
try {
  execFileSync(csc, [
    '/target:winexe',
    '/platform:anycpu',
    '/optimize+',
    '/out:' + exeFile,
    '/reference:System.dll,System.Windows.Forms.dll,System.Drawing.dll',
    csFile
  ], { stdio: 'inherit' });
  console.log('Successfully compiled:', exeFile);
} catch (err) {
  console.error('Compilation failed:', err);
  process.exit(1);
} finally {
  if (fs.existsSync(csFile)) fs.unlinkSync(csFile);
}
