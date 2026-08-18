$files = Get-ChildItem 'c:\pro\devcor\src\pages\themes\dark\*.jsx'
foreach ($f in $files) {
    $c = Get-Content $f.FullName -Raw
    $c = $c -replace "'../../context/", "'../../../context/"
    $c = $c -replace "'../../data/", "'../../../data/"
    $c = $c -replace "'../../components/", "'../../../components/"
    [System.IO.File]::WriteAllText($f.FullName, $c, [System.Text.Encoding]::UTF8)
    Write-Host "Fixed: $($f.Name)"
}
Write-Host "All done."
