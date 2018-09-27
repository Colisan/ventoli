@if (@CodeSection == @Batch) @then

@echo off
if defined upload_ftp_username (
    ::echo loaded %upload_ftp_username% %upload_ftp_password%
    echo FTP username and password loaded
) else (
    set /p "upload_ftp_username=FTP Username : "
    Call:InputPassword "FTP Password " upload_ftp_password
)

setlocal EnableDelayedExpansion

set ssh_commands=@echo off^

plink.exe %upload_ftp_username%@loveteit.fr -v -batch -pw %upload_ftp_password% rm -R -f /var/www/castleventoli.io/*

echo !ssh_commands!>ssh.bat
call ssh.bat
erase ssh.bat

::--- FTP script
set ftp_commands=cd castleventoli.io/^

mput -r http/*
::--- FTP script end

echo !ftp_commands!>.ftp
psftp.exe %upload_ftp_username%@loveteit.fr -pw %upload_ftp_password% -v -batch -bc -b "./.ftp"

if %ERRORLEVEL% == 0 (
    if not defined upload_ftp_username (
        ::echo saved %upload_ftp_username% %upload_ftp_password%
        Cscript //nologo //E:JScript "%~F0" upload_ftp_username "%upload_ftp_username%"
        Cscript //nologo //E:JScript "%~F0" upload_ftp_password "%upload_ftp_password%"
        echo FTP username and password saved
    )

    erase .ftp
) else (
    pause
)

goto :EOF
::***********************************
:InputPassword
set "psCommand=powershell -Command "$pword = read-host '%1' -AsSecureString ; ^
    $BSTR=[System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($pword); ^
      [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)""
        for /f "usebackq delims=" %%p in (`%psCommand%`) do set %2=%%p
)
goto :EOF  
::***********************************

goto :EOF
@end

var colEnvVars = WScript.CreateObject("WScript.Shell").Environment("Volatile");
colEnvVars(WScript.Arguments(0)) = WScript.Arguments(1);