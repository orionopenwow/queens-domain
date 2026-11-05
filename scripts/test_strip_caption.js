// scripts/test_strip_caption.js
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const csc = 'C:\\Windows\\Microsoft.NET\\Framework64\\v4.0.30319\\csc.exe';

const csSource = `
using System;
using System.Diagnostics;
using System.IO;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;

namespace TestLauncher
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

        static void Main()
        {
            Console.WriteLine("Win32 PInvoke is valid and compiles cleanly!");
        }
    }
}
`;

const csFile = path.join(__dirname, 'TestStrip.cs');
const exeFile = path.join(__dirname, 'TestStrip.exe');

fs.writeFileSync(csFile, csSource, 'utf8');

try {
  execFileSync(csc, [
    '/target:exe',
    '/platform:anycpu',
    '/out:' + exeFile,
    csFile
  ]);
  console.log('Compiled TestStrip.exe successfully!');
  const output = execFileSync(exeFile);
  console.log(output.toString());
} finally {
  if (fs.existsSync(csFile)) fs.unlinkSync(csFile);
  if (fs.existsSync(exeFile)) fs.unlinkSync(exeFile);
}
