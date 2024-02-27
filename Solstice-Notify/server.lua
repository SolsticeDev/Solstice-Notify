function sendNotificationToAllPlayers(type, title, message, duration, position)
    for _, player in ipairs(GetPlayers()) do
        local target = tonumber(player)
        TriggerClientEvent('Solstice:Notify', target, type, title, message, duration, position)
    end
end

