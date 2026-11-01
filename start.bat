@echo off
title ARCANUM Landing Page Launcher
echo ===================================================================
echo                     ARCANUM AI LANDING PAGE
echo ===================================================================
echo.
echo [1] Opening standalone preview directly in your browser...
start "" "%~dp0preview.html"
echo.
echo Standalone preview launched!
echo.
echo If you would like to run the Vite dev server with Hot Module Reload:
echo Press any key to install packages and start Vite dev server...
echo Otherwise, you can close this window.
echo.
pause

where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Node.js/npm was not found on your PATH.
    echo Don't worry! The standalone preview in your browser works without it.
    echo.
    pause
    exit /b
)

if not exist "%~dp0node_modules" (
    echo Installing dependencies...
    call npm install
)

echo Starting Vite dev server...
call npm run dev
pause

