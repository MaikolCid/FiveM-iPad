RegisterNetEvent('sendWallpapers')
AddEventHandler('sendWallpapers', function(wallpapers)
    SendNUIMessage({
        type = "wallpapersList",
        wallpapers = wallpapers
    })
end)