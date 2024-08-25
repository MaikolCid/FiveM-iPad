RegisterCommand('tablet', function()
    -- Manda un mensaje al frontend para mostrar la tablet
    SendNUIMessage({
        action = "showTablet"
    })
    -- Establece el foco del NUI en true, para permitir la interacción
    SetNuiFocus(true, true)
end, false)


RegisterNetEvent('sendWallpapers')
AddEventHandler('sendWallpapers', function(wallpapers)
    SendNUIMessage({
        type = "wallpapersList",
        wallpapers = wallpapers
    })
end)


RegisterNUICallback('saveBackground', function(data, cb)
    -- Envía los datos al servidor para guardar en la base de datos
    TriggerServerEvent('ajustes:saveBackground', data.background)
    cb('ok')
end)

RegisterNetEvent('tablet:setBackground')
AddEventHandler('tablet:setBackground', function(background)
    SendNUIMessage({
        action = 'setBackground',
        background = background
    })
end)

-- Cuando se carga la tablet, solicita el fondo guardado
RegisterNUICallback('loadBackground', function(data, cb)
    TriggerServerEvent('tablet:requestBackground')
    cb('ok')
end)


-- Cuando se carga la tablet, solicita el fondo guardado
RegisterNUICallback('loadBackground', function(data, cb)
    TriggerServerEvent('tablet:requestBackground')
    cb('ok')
end)

