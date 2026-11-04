@echo off
setlocal enabledelayedexpansion
title AI Game Studio Launcher

echo ===================================================
echo   AI GAME STUDIO // ZERO-DEPENDENCY LAUNCHER
echo ===================================================

:: Determine script root and project root
if exist "%~dp0scripts\launcher.ps1" (
  set "PROJECT_ROOT=%~dp0"
  set "LAUNCHER=%~dp0scripts\launcher.ps1"
) else if exist "%~dp0ai-game-studio-main\scripts\launcher.ps1" (
  set "PROJECT_ROOT=%~dp0ai-game-studio-main"
  set "LAUNCHER=%~dp0ai-game-studio-main\scripts\launcher.ps1"
) else (
  echo [ERROR] Could not find scripts\launcher.ps1!
  pause
  exit /b 1
)

echo [INFO] Launching app via %LAUNCHER%...

:: Execute the launcher script in background
powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "%LAUNCHER%"

if %ERRORLEVEL% neq 0 (
  echo [WARN] PowerShell windowed launcher had an error code %ERRORLEVEL%.
  echo [INFO] Starting fallback server directly...
  cd /d "%PROJECT_ROOT%"
  start "" node server\server.js
  timeout /t 2 /nobreak >nul
  start "" http://127.0.0.1:47831/
)

echo [OK] AI Game Studio launched.
