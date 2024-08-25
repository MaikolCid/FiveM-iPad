-- Function to get the list of image files in the directory
function getWallpapers()
    local wallpapers = {}
    local path = "resourcesimages/fondos/"
    
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


RegisterServerEvent('ajustes:saveBackground')
AddEventHandler('ajustes:saveBackground', function(background)
    local src = source
    local identifier = GetPlayerIdentifiers(src)[1] -- Obtén el identificador del jugador (Steam ID o License)

    -- Primero, intenta actualizar la fila existente
    MySQL.Async.execute('UPDATE ajustes SET background = @background WHERE identifier = @identifier', {
        ['@background'] = background,
        ['@identifier'] = identifier
    }, function(affectedRows)
        if affectedRows == 0 then
            -- Si no se afectó ninguna fila, significa que no existe el registro, así que inserta uno nuevo
            MySQL.Async.execute('INSERT INTO ajustes (identifier, background) VALUES (@identifier, @background)', {
                ['@identifier'] = identifier,
                ['@background'] = background
            }, function(rowsChanged)
                if rowsChanged > 0 then
                    print('Inserted new row for player: ' .. identifier)
                else
                    print('Failed to insert new row for player: ' .. identifier)
                end
            end)
        else
            print('Background updated successfully for player: ' .. identifier)
        end
    end)
end)


RegisterNetEvent('tablet:requestBackground')
AddEventHandler('tablet:requestBackground', function()
    local src = source
    local identifier = GetPlayerIdentifiers(src)[1]

    MySQL.Async.fetchScalar('SELECT background FROM ajustes WHERE identifier = @identifier', {
        ['@identifier'] = identifier
    }, function(background)
        if background then
            TriggerClientEvent('tablet:setBackground', src, background)
        else
            TriggerClientEvent('tablet:setBackground', src, 'images/fondos/1.jpg') -- Fondo predeterminado
        end
    end)
end)
