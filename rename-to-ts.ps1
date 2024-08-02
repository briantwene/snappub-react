param (
    [string]$directory = $(Read-Host -Prompt "Enter the directory path")
)

if (-Not (Test-Path $directory)) {
    Write-Error "The specified directory does not exist."
    exit
}

# Get all .js files and rename them to .ts
Get-ChildItem -Path $directory -Recurse -Filter *.js | ForEach-Object {
    $newName = $_.FullName -replace '\.js$', '.ts'
    Rename-Item -Path $_.FullName -NewName $newName
}

# Get all .jsx files and rename them to .tsx
Get-ChildItem -Path $directory -Recurse -Filter *.jsx | ForEach-Object {
    $newName = $_.FullName -replace '\.jsx$', '.tsx'
    Rename-Item -Path $_.FullName -NewName $newName
}

Write-Output "Renaming complete."