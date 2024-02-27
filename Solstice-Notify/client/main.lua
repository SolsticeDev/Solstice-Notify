function Notify(type, title, message, time, position)
	SendNUIMessage({
		action = 'notification',
		type = type,
        title = title,
        message = message,
        time = time,
		position = position -- left - appears on the left side of the screen, right - appears on the right side of the screen, center - appears in the center of the screen
	})
end

RegisterNetEvent('Solstice:Notify')
AddEventHandler('Solstice:Notify', function(type, title, message, time, position)
	Notify(type, title, message, time, position)
end)

-- Add this line to register your new command
RegisterCommand("testnotify", function(source, args, rawCommand)
    local notifyType = args[1] or "info"  -- Default to "info" if no type is provided
    local title = "Test Title"
    local message = "This is a test message."
    local time = 5000  -- Time in milliseconds
    local position = "top-right"  -- Position on the screen

    -- Trigger the notification function
    Notify(notifyType, title, message, time, position)
end, false)


--Example usage:

--[[
	exports['Solstice-Notify']:Notify("system", "System", "System notification message", 4000, "right")
	exports['Solstice-Notify']:Notify("info", "Information", "Information notification message", 4000, "left")
	exports['Solstice-Notify']:Notify("success", "Success", "Success notification message", 4000, "center")
	exports['Solstice-Notify']:Notify("error", "Error", "Error notification message", 4000, "left")
	exports['Solstice-Notify']:Notify("warning", "Warning", "Warning notification message", 4000, "right")
	exports['Solstice-Notify']:Notify("sms", "SMS", "SMS notification message", 4000, "center")
]]
