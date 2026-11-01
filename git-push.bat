@echo off
setlocal enabledelayedexpansion
title Git Commit & Push — ARCANUM Landing Page
color 0b

echo ===================================================================
echo               ARCANUM GIT COMMIT & PUSH LAUNCHER
echo ===================================================================
echo.

cd /d "%~dp0"

:: Auto-detect Git path if not on default PATH
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Looking for Git in common install locations...
    if exist "C:\Program Files\Git\cmd\git.exe" (
        set "PATH=C:\Program Files\Git\cmd;!PATH!"
    ) else if exist "C:\Program Files\Git\bin\git.exe" (
        set "PATH=C:\Program Files\Git\bin;!PATH!"
    ) else if exist "C:\Program Files (x86)\Git\cmd\git.exe" (
        set "PATH=C:\Program Files (x86)\Git\cmd;!PATH!"
    ) else if exist "%LOCALAPPDATA%\Programs\Git\cmd\git.exe" (
        set "PATH=%LOCALAPPDATA%\Programs\Git\cmd;!PATH!"
    )
)

where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Git could not be found on this computer.
    echo Please install Git from https://git-scm.com/ or use GitHub Desktop.
    echo.
    pause
    exit /b 1
)

echo [1/3] Staging modified & new files...
git add .
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to stage files.
    pause
    exit /b 1
)
echo [OK] Files staged.
echo.

echo [2/3] Creating commit...
git commit -m "Refine header design, add student portal auth page, partner logo & demo video showcase"
if %ERRORLEVEL% EQU 0 (
    echo [OK] Commit created successfully.
) else (
    echo [INFO] No new changes to commit, or commit already created.
)
echo.

echo [3/3] Syncing and pushing to GitHub (origin/main)...
git pull origin main --rebase
git push -u origin main
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ===================================================================
    echo            SUCCESS: All changes pushed to GitHub!
    echo ===================================================================
    echo Repository: https://github.com/Pari-Parmar/landing_page_arcanum
) else (
    echo.
    echo ===================================================================
    echo [NOTICE] If the push was rejected due to login/credentials:
    echo   1. Please sign in via the browser popup if Git requests it.
    echo   2. Or in VS Code, open the Source Control panel (Ctrl+Shift+G)
    echo      and click "Sync Changes" to push using your saved GitHub login.
    echo ===================================================================
)

echo.
pause
