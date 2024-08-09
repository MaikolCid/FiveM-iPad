-- Function to get the list of image files in the directory
function getWallpapers()
    local wallpapers = {}
    local path = "resources/fivem_tablet/html/images/fondos/"
    
    -- This command works in most Unix-like environments
    local p = io.popen('ls "'..path..'"')
    
    for file in p:lines() do
        if string.match(file, "%.jpg$") or string.match(file, "%.png$") then
            table.insert(wallpapers, file)
        end
    end

    return wallpapers
end

-- Expose the list to the client
RegisterNetEvent('getWallpapers')
AddEventHandler('getWallpapers', function()
    local wallpapers = getWallpapers()
    TriggerClientEvent('sendWallpapers', source, wallpapers)
end)