$files = @(
    'c:\pro\devcor\src\pages\themes\rose\RoseThemePages.jsx',
    'c:\pro\devcor\src\pages\themes\ocean\OceanThemePages.jsx'
)
foreach ($path in $files) {
    $c = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
    $c = $c -replace "'../../context/", "'../../../context/"
    $c = $c -replace "'../../data/", "'../../../data/"
    $c = $c -replace "'../../components/", "'../../../components/"
    [System.IO.File]::WriteAllText($path, $c, [System.Text.Encoding]::UTF8)
    Write-Host "Fixed: $path"
}
Write-Host "All done."
