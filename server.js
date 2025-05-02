const {
  createConnection,
  TextDocuments,
  CompletionItemKind,
  ProposedFeatures,
} = require("vscode-languageserver/node");
const { TextDocument } = require("vscode-languageserver-textdocument");

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);

connection.onInitialize(() => {
  return {
    capabilities: {
      textDocumentSync: documents.syncKind,
      completionProvider: {
        resolveProvider: false,
        triggerCharacters: ["&", "$."],
      },
      hoverProvider: true,
    },
  };
});

connection.onCompletion(() => {
  return [
    {
      label: "call",
      kind: CompletionItemKind.Function,
      detail: "call <macroname> [<parameters>]",
      documentation: "Calls macro <macroname>. Ex: call $killmacro",
    },
    {
      label: "release",
      kind: CompletionItemKind.Function,
      detail: "release (<name> | all)",
      documentation: "Reenables a locked automacro or all automacros.",
    },
    {
      label: "lock",
      kind: CompletionItemKind.Function,
      detail: "lock (<name> | all)",
      documentation: "Locks automacro and disables checks.",
    },
    {
      label: "stop",
      kind: CompletionItemKind.Function,
      detail: "stop",
      documentation: "Immediately terminates the running macro.",
    },
    {
      label: "include",
      kind: CompletionItemKind.Function,
      detail: "include (on | off | list) [filename | pattern]",
      documentation: "Manages eventMacros file inclusion.",
    },
    {
      label: "set",
      kind: CompletionItemKind.Function,
      detail: "set <option> <value>",
      documentation: "Sets macro options like macro_delay, overrideAI, etc.",
    },
    {
      label: "do",
      kind: 14, // CompletionItemKind.Keyword
      detail: "Run command",
      documentation:
        "Run <command>, as if it was entered in OpenKore terminal. Commands are from Console Commands.",
    },
    {
      label: "log",
      kind: 14,
      detail: "Print text",
      documentation: "Prints a text in the console",
    },
    {
      label: "warning",
      kind: 14,
      detail: "Print warning",
      documentation: "Prints a warning in the console",
    },
    {
      label: "error",
      kind: 14,
      detail: "Print error",
      documentation: "Prints an error in the console",
    },
    {
      label: "pause",
      kind: 14,
      detail: "Pause character",
      documentation:
        "Pauses all character actions for n seconds. If n is omitted, it pauses indefinitely.",
    },
    {
      label: "call",
      kind: 14,
      detail: "Call macro",
      documentation:
        "Calls macro <macroname> [set <parameters>]. When <macroname> is finished the current macro continues.",
    },
    {
      label: "release",
      kind: 14,
      detail: "Release automacro",
      documentation:
        'Reenables a locked automacro ("run-once" or "lock") or all automacros using `release all`.',
    },
    {
      label: "lock",
      kind: 14,
      detail: "Lock automacro",
      documentation:
        "Locks an automacro and disables its checks. Use `lock all` to lock all automacros.",
    },
    {
      label: "stop",
      kind: 14,
      detail: "Stop macro",
      documentation: "Immediately terminates the running macro.",
    },
    {
      label: "include",
      kind: 14,
      detail: "Include file or pattern",
      documentation:
        "Enables or disables !include in eventMacros file.\nUsage: include [on|off|list] [filename or pattern]",
    },
    {
      label: "set",
      kind: 14,
      detail: "Set macro option",
      documentation: `Sets macro features:\n- orphan method\n- macro_delay timeout\n- overrideAI [0|1]\n- repeat times\n- exclusive [0|1]`,
    },
    {
      label: "automacro",
      kind: CompletionItemKind.Keyword,
      documentation:
        "automacro name\n\nBlock to define conditions to call a macro.",
    },
    {
      label: "macro",
      kind: CompletionItemKind.Keyword,
      documentation: "macro name\n\nBlock to define the instructions.",
    },
    {
      label: "delay",
      kind: CompletionItemKind.Property,
      documentation:
        "delay seconds\n\nDefines the time in seconds to wait before executing the macro in call parameter.",
    },
    {
      label: "run-once",
      kind: CompletionItemKind.Property,
      documentation:
        "run-once boolean\n\nDefines if the automacro can activate only once, or multiple times.",
    },
    {
      label: "CheckOnAI",
      kind: CompletionItemKind.Property,
      documentation:
        "CheckOnAI [auto, manual, off]\n\nDefines in which AI states the automacro can activate.",
    },
    {
      label: "disabled",
      kind: CompletionItemKind.Property,
      documentation:
        "disabled boolean\n\nDefines if the automacro is active or not.",
    },
    {
      label: "overrideAI",
      kind: CompletionItemKind.Property,
      documentation:
        "overrideAI boolean\n\nDefines if eventMacro will put itself in the AI queue.",
    },
    {
      label: "exclusive",
      kind: CompletionItemKind.Property,
      documentation:
        "exclusive boolean\n\nDefines if the macro can be interrupted or not.",
    },
    {
      label: "priority",
      kind: CompletionItemKind.Property,
      documentation:
        "priority number\n\nDefines the activation priority between all automacros. Lower = sooner.",
    },
    {
      label: "macro_delay",
      kind: CompletionItemKind.Property,
      documentation:
        "macro_delay number\n\nDefines the time in seconds to wait between macro commands.",
    },
    {
      label: "orphan",
      kind: CompletionItemKind.Property,
      documentation:
        "orphan [terminate | reregister | reregister_safe | terminate_last_call]\n\nDefines how eventMacro handles leftover macros when cleared from the AI queue.",
    },
    {
      label: "timeout",
      kind: CompletionItemKind.Property,
      documentation:
        "timeout number\n\nTime in seconds before this automacro can activate again.",
    },
    {
      label: "BaseLevel",
      kind: CompletionItemKind.Property,
      detail: "Checks the player base level.",
    },
    {
      label: "JobLevel",
      kind: CompletionItemKind.Property,
      detail: "Checks the player job level.",
    },
    {
      label: "CartCurrentWeight",
      kind: CompletionItemKind.Property,
      detail: "Checks the player's cart current weight.",
    },
    {
      label: "CartMaxWeight",
      kind: CompletionItemKind.Property,
      detail: "Checks the player's cart max weight.",
    },
    {
      label: "CartCurrentSize",
      kind: CompletionItemKind.Property,
      detail: "Checks the player's cart current item quantity.",
    },
    {
      label: "CartMaxSize",
      kind: CompletionItemKind.Property,
      detail: "Checks the player's cart max item quantity.",
    },
    {
      label: "CharCurrentWeight",
      kind: CompletionItemKind.Property,
      detail: "Checks the player's current weight.",
    },
    {
      label: "CharMaxWeight",
      kind: CompletionItemKind.Property,
      detail: "Checks the player's max weight.",
    },
    {
      label: "FreeStatPoints",
      kind: CompletionItemKind.Property,
      detail: "Checks the player's free stat points.",
    },
    {
      label: "FreeSkillPoints",
      kind: CompletionItemKind.Property,
      detail: "Checks the player's free skill points.",
    },
    {
      label: "CurrentHP",
      kind: CompletionItemKind.Property,
      detail: "Checks the player's current hp.",
    },
    {
      label: "MaxHP",
      kind: CompletionItemKind.Property,
      detail: "Checks the player's max hp.",
    },
    {
      label: "CurrentSP",
      kind: CompletionItemKind.Property,
      detail: "Checks the player's current sp.",
    },
    {
      label: "MaxSP",
      kind: CompletionItemKind.Property,
      detail: "Checks the player's max sp.",
    },
    {
      label: "InInventory",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if the player has a certain quantity of an item in the inventory, uses item name.",
    },
    {
      label: "InInventoryID",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if the player has a certain quantity of an item in the inventory, uses item ID.",
    },
    {
      label: "InStorage",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if the player has a certain quantity of an item in the storage, uses item name.",
    },
    {
      label: "InStorageID",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if the player has a certain quantity of an item in the storage, uses item ID.",
    },
    {
      label: "InCart",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if the player has a certain quantity of an item in the cart, uses item name.",
    },
    {
      label: "InCartID",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if the player has a certain quantity of an item in the cart, uses item ID.",
    },
    {
      label: "InventoryCurrentSize",
      kind: CompletionItemKind.Property,
      detail: "Checks the player current item count.",
    },
    {
      label: "SkillLevel",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if the player has a certain level of a certain skill, uses skill Id or Handle.",
    },
    {
      label: "Zeny",
      kind: CompletionItemKind.Property,
      detail: "Checks the player current zeny.",
    },
    {
      label: "StorageOpened",
      kind: CompletionItemKind.Property,
      detail:
        "Is true if storage is opened and it is set to 1 or storage is not opened and it is set to 0.",
    },
    {
      label: "ShopOpened",
      kind: CompletionItemKind.Property,
      detail:
        "Is true if your vending shop is opened and it is set to 1 or your vending shop is not opened and it is set to 0.",
    },
    {
      label: "InChatRoom",
      kind: CompletionItemKind.Property,
      detail:
        "Is true if you are in a chat room and it is set to 1 or you are not in a chat room and it is set to 0.",
    },
    {
      label: "ChatRoomNear",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if there is a npc near which name matches the given regex.",
    },
    {
      label: "InMap",
      kind: CompletionItemKind.Property,
      detail: "Checks if the current map match one of the given maps.",
    },
    {
      label: "InLockMap",
      kind: CompletionItemKind.Property,
      detail:
        "Is true if you are in lockmap and it is set to 1 or you are not in lockmap and it is set to 0.",
    },
    {
      label: "InSaveMap",
      kind: CompletionItemKind.Property,
      detail:
        "Is true if you are in savemap and it is set to 1 or you are not in savemap and it is set to 0.",
    },
    {
      label: "IsInCoordinate",
      kind: CompletionItemKind.Property,
      detail: "Checks if the current coordinates match one of the given ones.",
    },
    {
      label: "IsInMapAndCoordinate",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if the current map and/or coordinates match one of the given maps.",
    },
    {
      label: "InPvP",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if the current pvp type of the map matches the given type.",
    },
    {
      label: "InCity",
      kind: CompletionItemKind.Property,
      detail: "Checks if the player is in a city or not.",
    },
    {
      label: "InMapRegex",
      kind: CompletionItemKind.Property,
      detail: "Checks if the current map matches the given regex.",
    },
    {
      label: "NpcNear",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if there is a npc near which name matches the given regex.",
    },
    {
      label: "NpcNearDist",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if there is a npc in a given distance which name matches the given regex.",
    },
    {
      label: "NpcNotNear",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if there's no npc near which name matches the given regex.",
    },
    {
      label: "PlayerNear",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if there is a player near which name matches the given regex.",
    },
    {
      label: "PlayerNearDist",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if there is a player in a given distance which name matches the given regex.",
    },
    {
      label: "PlayerNotNear",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if there's no player near which name matches the given regex.",
    },
    {
      label: "MobNear",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if there is a mob near which name matches the given regex.",
    },
    {
      label: "MobNearDist",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if there is a mob in a given distance which name matches the given regex.",
    },
    {
      label: "MobNotNear",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if there's no mob near which name matches the given regex.",
    },
    {
      label: "JobID",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if the Job ID of the current player job matches one of the given ones.",
    },
    {
      label: "JobIDNot",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if the Job ID of the current player job does not match the given one.",
    },
    {
      label: "IsEquippedID",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if the player has an item equipped which ID matches the given one.",
    },
    {
      label: "IsNotEquippedID",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if the player doesn't have an item equipped which ID matches the given one.",
    },
    {
      label: "ConfigKey",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if the one or more of the given config keys match it's desired value.",
    },
    {
      label: "ConfigKeyNot",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if the at least one of the config key pairs doesn't match their desired value.",
    },
    {
      label: "ConfigKeyNotExist",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if the at least one of the config keys doesn't exist in config.txt.",
    },
    {
      label: "InProgressBar",
      kind: CompletionItemKind.Property,
      detail: "Checks if the player is waiting for a progress bar to end.",
    },
    {
      label: "StatusActiveHandle",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if the player has one of the given status, uses status HANDLE.",
    },
    {
      label: "StatusInactiveHandle",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if the player doesn't have one of the given status, uses status HANDLE.",
    },
    {
      label: "QuestActive",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if the player has one of the given quests active, uses quest ID.",
    },
    {
      label: "QuestInactive",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if the player has of the given quests inactive, uses quest ID.",
    },
    {
      label: "QuestOnTime",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if the player has one of the given quests active, and this quest has a timer that hasn't ended yet, uses quest ID.",
    },
    {
      label: "QuestTimeOverdue",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if the player has one of the given quests active, and this quest has a timer that has already ended, uses quest ID.",
    },
    {
      label: "QuestHuntCompleted",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if the player has one of the given quests active, and this quest has a hunt mission which wasn't completed yet, uses quest ID and Mob ID.",
    },
    {
      label: "QuestHuntOngoing",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if the player has one of the given quests active, and this quest has a hunt mission which has not been completed yet, uses quest ID and Mob ID.",
    },
    {
      label: "NoPlayerNear",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if there are any players near, it's true when there's none.",
    },
    {
      label: "NoPortalNear",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if there are any portals near, it's true when there's none.",
    },
    {
      label: "NoMobNear",
      kind: CompletionItemKind.Property,
      detail: "Checks if there are any mobs near, it's true when there's none.",
    },
    {
      label: "NoNpcNear",
      kind: CompletionItemKind.Property,
      detail: "Checks if there are any npcs near, it's true when there's none.",
    },
    {
      label: "PlayerNearCount",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if the number of players near match the given math condition.",
    },
    {
      label: "NpcNearCount",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if the number of npcs near match the given math condition.",
    },
    {
      label: "MobNearCount",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if the number of mobs near match the given math condition.",
    },
    {
      label: "PortalNearCount",
      kind: CompletionItemKind.Property,
      detail:
        "Checks if the number of portals near match the given math condition.",
    },
    {
      label: "PubMsg",
      kind: CompletionItemKind.Property,
      detail:
        "Is checked on public messages, is true when the message matches the given regex.",
    },
    {
      label: "PubMsgDist",
      kind: CompletionItemKind.Property,
      detail:
        "Is checked on public messages, is true when the message matches the given regex and the distance match the given condition.",
    },
    {
      label: "PubMsgName",
      kind: CompletionItemKind.Property,
      detail:
        "Is checked on public messages, is true when the message matches the given regex and the name of the player which sent it also matches it's given regex.",
    },
    {
      label: "PubMsgNameDist",
      kind: CompletionItemKind.Property,
      detail:
        "Is checked on public messages, is true when the message matches the given regex and the name of the player which sent it also matches it's given regex and the distance matches the condition.",
    },
    {
      label: "PrivMsg",
      kind: CompletionItemKind.Property,
      detail:
        "Is checked on private messages, is true when the message matches the given regex.",
    },
    {
      label: "PrivMsgDist",
      kind: CompletionItemKind.Property,
      detail:
        "Is checked on private messages, is true when the message matches the given regex and the distance match the given condition.",
    },
    {
      label: "PrivMsgName",
      kind: CompletionItemKind.Property,
      detail:
        "Is checked on private messages, is true when the message matches the given regex and the name of the player which sent it also matches it's given regex.",
    },
    {
      label: "PrivMsgNameDist",
      kind: CompletionItemKind.Property,
      detail:
        "Is checked on private messages, is true when the message matches the given regex and the name of the player which sent it also matches it's given regex and the distance matches the condition.",
    },
    {
      label: "PartyMsg",
      kind: CompletionItemKind.Property,
      detail:
        "Is checked on party messages, is true when the message matches the given regex.",
    },
    {
      label: "PartyMsgDist",
      kind: CompletionItemKind.Property,
      detail:
        "Is checked on party messages, is true when the message matches the given regex and the distance match the given condition.",
    },
    {
      label: "PartyMsgName",
      kind: CompletionItemKind.Property,
      detail:
        "Is checked on party messages, is true when the message matches the given regex and the name of the player which sent it also matches it's given regex.",
    },
    {
      label: "PartyMsgNameDist",
      kind: CompletionItemKind.Property,
      detail:
        "Is checked on party messages, is true when the message matches the given regex and the name of the player which sent it also matches it's given regex and the distance matches the condition.",
    },
    {
      label: "GuildMsg",
      kind: CompletionItemKind.Property,
      detail:
        "Is checked on guild messages, is true when the message matches the given regex.",
    },
    {
      label: "GuildMsgDist",
      kind: CompletionItemKind.Property,
      detail:
        "Is checked on guild messages, is true when the message matches the given regex and the distance match the given condition.",
    },
    {
      label: "GuildMsgName",
      kind: CompletionItemKind.Property,
      detail:
        "Is checked on guild messages, is true when the message matches the given regex and the name of the player which sent it also matches it's given regex.",
    },
    {
      label: "GuildMsgNameDist",
      kind: CompletionItemKind.Property,
      detail:
        "Is checked on guild messages, is true when the message matches the given regex and the name of the player which sent it also matches it's given regex and the distance matches the condition.",
    },
    {
      label: "NpcMsg",
      kind: CompletionItemKind.Property,
      detail:
        "Is checked on npc conversation messages, is true when the message matches the given regex.",
    },
    {
      label: "NpcMsgDist",
      kind: CompletionItemKind.Property,
      detail:
        "Is checked on npc conversation messages, is true when the message matches the given regex and the distance match the given condition.",
    },
    {
      label: "NpcMsgName",
      kind: CompletionItemKind.Property,
      detail:
        "Is checked on npc conversation messages, is true when the message matches the given regex and the name of the npc which sent it also matches it's given regex.",
    },
    {
      label: "NpcMsgNameDist",
      kind: CompletionItemKind.Property,
      detail:
        "Is checked on npc conversation messages, is true when the message matches the given regex and the name of the npc which sent it also matches it's given regex and the distance matches the condition.",
    },
    {
      label: "LocalMsg",
      kind: CompletionItemKind.Property,
      detail:
        "Is checked on local broadcast messages, is true when the message matches the given regex.",
    },
    {
      label: "BusMsg",
      kind: CompletionItemKind.Property,
      detail:
        "Is checked on bus system messages, is true when the message matches the given regex.",
    },
    {
      label: "MapLoaded",
      kind: CompletionItemKind.Property,
      detail:
        "Is checked everytime a map change event occur (teleport, map changes), is true if the current map match one of the given ones.",
    },
    {
      label: "OnCharLogIn",
      kind: CompletionItemKind.Property,
      detail:
        "Is always true, activates everytime the character logs into the game.",
    },
    {
      label: "ZenyChanged",
      kind: CompletionItemKind.Property,
      detail:
        "Is checked everytime the amount of zeny changes, is true if the math condition is true.",
    },
    {
      label: "SimpleHookEvent",
      kind: CompletionItemKind.Property,
      detail: "Is checked every time the hook you set, is triggered.",
    },
    {
      label: "&defined",
      kind: CompletionItemKind.Method,
      detail: "&defined($<variable>)",
      documentation:
        "Checks if a variable exists. Returns 1 if it does, else 0.",
      insertText: "&defined($variable)",
    },
    {
      label: "&push",
      kind: CompletionItemKind.Method,
      detail: "&push(@array, newmember)",
      documentation: "Adds a new member to the end of an array.",
      insertText: "&push(@array, newmember)",
    },
    {
      label: "&pop",
      kind: CompletionItemKind.Method,
      detail: "&pop(@array)",
      documentation: "Removes the last element from an array.",
      insertText: "&pop(@array)",
    },
    {
      label: "&shift",
      kind: CompletionItemKind.Method,
      detail: "&shift(@array)",
      documentation: "Removes the first element from an array.",
      insertText: "&shift(@array)",
    },
    {
      label: "&unshift",
      kind: CompletionItemKind.Method,
      detail: "&unshift(@array, newmember)",
      documentation: "Adds a new member to the beginning of an array.",
      insertText: "&unshift(@array, newmember)",
    },
    {
      label: "&delete",
      kind: CompletionItemKind.Method,
      detail: "&delete($<hash>{<key>})",
      documentation: "Deletes a key from a hash.",
      insertText: "&delete($hash{key})",
    },
    {
      label: "&exists",
      kind: CompletionItemKind.Method,
      detail: "&exists($<hash>{<key>})",
      documentation:
        "Checks if a key exists in a hash. Returns 1 if it has a value, else 0.",
      insertText: "&exists($hash{key})",
    },
    {
      label: "&questStatus",
      kind: CompletionItemKind.Method,
      detail:
        "Returns the status of quest <questID> as a string (inactive, incomplete or complete).",
      insertText: "&questStatus(questID)",
    },
    {
      label: "&questInactiveCount",
      kind: CompletionItemKind.Method,
      detail:
        'Returns the number of given quests which have status "inactive".',
      insertText: "&questInactiveCount(questID)",
    },
    {
      label: "&questIncompleteCount",
      kind: CompletionItemKind.Method,
      detail:
        'Returns the number of given quests which have status "incomplete".',
      insertText: "&questIncompleteCount(questID)",
    },
    {
      label: "&questCompleteCount",
      kind: CompletionItemKind.Method,
      detail:
        'Returns the number of given quests which have status "complete".',
      insertText: "&questCompleteCount(questID)",
    },
    {
      label: "&inventory",
      kind: CompletionItemKind.Method,
      detail:
        "Returns inventory item index of <item|ID>. Returns -1 if not found.",
      insertText: "&inventory(itemName|ID)",
    },
    {
      label: "&Inventory",
      kind: CompletionItemKind.Method,
      detail:
        "Same as &inventory but returns all matching indexes as a comma-separated list or -1 if not found.",
      insertText: "&Inventory(itemName|ID)",
    },
    {
      label: "&invamount",
      kind: CompletionItemKind.Method,
      detail: "Returns the amount of the given <item|ID> in inventory.",
      insertText: "&invamount(itemName|ID)",
    },
    {
      label: "&InventoryType",
      kind: CompletionItemKind.Method,
      detail:
        "Returns a comma-separated list with all items of the specified type (usable, equip, etc).",
      insertText: "&InventoryType()",
    },
    {
      label: "&cart",
      kind: CompletionItemKind.Method,
      detail: "Returns cart item index of <item|ID>. Returns -1 if not found.",
      insertText: "&cart(itemName|ID)",
    },
    {
      label: "&Cart",
      kind: CompletionItemKind.Method,
      detail:
        "Same as &cart but returns all matching indexes as a comma-separated list or -1 if not found.",
      insertText: "&Cart(itemName|ID)",
    },
    {
      label: "&cartamount",
      kind: CompletionItemKind.Method,
      detail: "Returns the amount of the given <item|ID> in cart.",
      insertText: "&cartamount(itemName|ID)",
    },
    {
      label: "&storage",
      kind: CompletionItemKind.Method,
      detail:
        "Returns storage item index of <item|ID>. Returns -1 if not found.",
      insertText: "&storage(itemName|ID)",
    },
    {
      label: "&Storage",
      kind: CompletionItemKind.Method,
      detail:
        "Same as &storage but returns all matching indexes as a comma-separated list or -1 if not found.",
      insertText: "&Storage(itemName|ID)",
    },
    {
      label: "&storamount",
      kind: CompletionItemKind.Method,
      detail: "Returns the amount of the given <item|ID> in storage.",
      insertText: "&storamount(itemName|ID)",
    },
    {
      label: "&venderitem",
      kind: CompletionItemKind.Method,
      detail:
        "Looks for an item in a player's shop and returns index or -1 if not found.",
      insertText: "&venderitem(itemName|ID)",
    },
    {
      label: "&venderprice",
      kind: CompletionItemKind.Method,
      detail: "Looks for an item in a player's shop and returns its price.",
      insertText: "&venderprice(itemName|ID)",
    },
    {
      label: "&venderamount",
      kind: CompletionItemKind.Method,
      detail: "Returns the amount of the given <item> in a player's shop.",
      insertText: "&venderamount(itemName|ID)",
    },
    {
      label: "&store",
      kind: CompletionItemKind.Method,
      detail:
        "Looks for an item in a store and returns index or -1 if not found.",
      insertText: "&store(itemName|ID)",
    },
    {
      label: "&shopamount",
      kind: CompletionItemKind.Method,
      detail: "Returns the amount of the given <item> in shop.",
      insertText: "&shopamount(itemName|ID)",
    },
    {
      label: "&npc",
      kind: CompletionItemKind.Method,
      detail:
        "Return NPC index by name, location or pattern. Returns -1 if not found.",
      insertText: "&npc(name)",
    },
    {
      label: "&player",
      kind: CompletionItemKind.Method,
      detail: "Returns player index of <name>. Returns -1 if not found.",
      insertText: "&player(name)",
    },
    {
      label: "&monster",
      kind: CompletionItemKind.Method,
      detail: "Returns monster index of <name|ID>. Returns -1 if not found.",
      insertText: "&monster(name|ID)",
    },
    {
      label: "&vender",
      kind: CompletionItemKind.Method,
      detail: "Returns vender index of <name>. Returns -1 if not found.",
      insertText: "&vender(name)",
    },
    {
      label: "&config",
      kind: CompletionItemKind.Method,
      detail: "Returns value of <variable> in config.txt.",
      insertText: "&config(key)",
    },
    {
      label: "&random",
      kind: CompletionItemKind.Method,
      detail: "Returns randomly one of the given arguments.",
      insertText: "&random(arg1, arg2...)",
    },
    {
      label: "&rand",
      kind: CompletionItemKind.Method,
      detail: "Returns a random number between <n> and <m>.",
      insertText: "&rand(min, max)",
    },
    {
      label: "&eval",
      kind: CompletionItemKind.Method,
      detail:
        "Evaluates Perl code in argument. Limited to variable/macro syntax.",
      insertText: "&eval(code)",
    },
    {
      label: "&arg",
      kind: CompletionItemKind.Method,
      detail:
        "Returns the <n>th word of <argument> or an empty string if out of range.",
      insertText: "&arg()",
    },
    {
      label: "&nick",
      kind: CompletionItemKind.Method,
      detail: "Escapes special characters in a name string.",
      insertText: "&nick(name)",
    },
    {
      label: "&split",
      kind: CompletionItemKind.Method,
      detail: "Creates array from variable using a separator.",
      insertText: "&split(separator, variable)",
    },
    {
      label: "&keys",
      kind: CompletionItemKind.Method,
      detail: "Creates an array from the keys of a hash.",
      insertText: "&keys(%hash)",
    },
    {
      label: "&values",
      kind: CompletionItemKind.Method,
      detail: "Creates an array from the values of a hash.",
      insertText: "&values(%hash)",
    },
    {
      label: "&listlength",
      kind: CompletionItemKind.Method,
      detail: "Returns the length of a comma-separated list.",
      insertText: "&listlength('a','b')",
    },
    {
      label: "&strip",
      kind: CompletionItemKind.Method,
      detail: "Removes parentheses from text.",
      insertText: "&strip(text)",
    },
    {
      label: "$.time",
      kind: CompletionItemKind.Variable,
      detail: "Current time as unix timestamp",
    },
    {
      label: "$.datetime",
      kind: CompletionItemKind.Variable,
      detail: "Current date and time",
    },
    {
      label: "$.second",
      kind: CompletionItemKind.Variable,
      detail: "Current second time (0 - 59)",
    },
    {
      label: "$.minute",
      kind: CompletionItemKind.Variable,
      detail: "Current minute time (0 - 59)",
    },
    {
      label: "$.hour",
      kind: CompletionItemKind.Variable,
      detail: "Current hour time in 24h format",
    },
    {
      label: "$.dayofmonth",
      kind: CompletionItemKind.Variable,
      detail: "Current day of month",
    },
    {
      label: "$.dayofweek",
      kind: CompletionItemKind.Variable,
      detail: "Current day of week (Monday, Tuesday, ...)",
    },
    {
      label: "$.map",
      kind: CompletionItemKind.Variable,
      detail: "The Map you're currently in",
    },
    {
      label: "$.incity",
      kind: CompletionItemKind.Variable,
      detail: "Boolean, 1 whenever at a city, 0 otherwise",
    },
    {
      label: "$.inlockmap",
      kind: CompletionItemKind.Variable,
      detail: "Boolean, 1 whenever at a lockMap, 0 otherwise",
    },
    {
      label: "$.job",
      kind: CompletionItemKind.Variable,
      detail: "The current character job",
    },
    {
      label: "$.pos",
      kind: CompletionItemKind.Variable,
      detail: "Your current position",
    },
    {
      label: "$.name",
      kind: CompletionItemKind.Variable,
      detail: "The character name",
    },
    {
      label: "$.hp",
      kind: CompletionItemKind.Variable,
      detail: "Current HP",
    },
    {
      label: "$.sp",
      kind: CompletionItemKind.Variable,
      detail: "Current SP",
    },
    {
      label: "$.lvl",
      kind: CompletionItemKind.Variable,
      detail: "Current base level",
    },
    {
      label: "$.joblvl",
      kind: CompletionItemKind.Variable,
      detail: "Current job level",
    },
    {
      label: "$.spirits",
      kind: CompletionItemKind.Variable,
      detail: "Number of current spirit spheres or coin flip's coins",
    },
    {
      label: "$.zeny",
      kind: CompletionItemKind.Variable,
      detail: "Current zeny",
    },
    {
      label: "$.weight",
      kind: CompletionItemKind.Variable,
      detail: "Current character weight",
    },
    {
      label: "$.weightpercent",
      kind: CompletionItemKind.Variable,
      detail: "Current character weight in percentage",
    },
    {
      label: "$.maxweight",
      kind: CompletionItemKind.Variable,
      detail: "Current maximum character weight",
    },
    {
      label: "$.status",
      kind: CompletionItemKind.Variable,
      detail:
        "Current statuses (comma-separated) - Attention Concentrate, Endure, Two-Hand Quicken",
    },
    {
      label: "$.statushandle",
      kind: CompletionItemKind.Variable,
      detail: "Current statuses handles - SM_ENDURE, KN_TWOHANDQUICKEN",
    },
    {
      label: "$.inventoryitems",
      kind: CompletionItemKind.Variable,
      detail: "Current amount of items in inventory",
    },
    {
      label: "$.cartweight",
      kind: CompletionItemKind.Variable,
      detail: "Current cart weight",
    },
    {
      label: "$.cartweightpercent",
      kind: CompletionItemKind.Variable,
      detail: "Current cart weight in percentage",
    },
    {
      label: "$.cartmaxweight",
      kind: CompletionItemKind.Variable,
      detail: "Current cart max weight",
    },
    {
      label: "$.cartitems",
      kind: CompletionItemKind.Variable,
      detail: "Current amount of items in cart",
    },
    {
      label: "$.cartmaxitems",
      kind: CompletionItemKind.Variable,
      detail: "Current max amount of items in cart",
    },
    {
      label: "$.shopopen",
      kind: CompletionItemKind.Variable,
      detail: "1 if shop is opened, 0 otherwise",
    },
    {
      label: "$.storageopen",
      kind: CompletionItemKind.Variable,
      detail: "1 if storage is opened, 0 otherwise",
    },
    {
      label: "$.storageitems",
      kind: CompletionItemKind.Variable,
      detail: "Current amount of items in storage",
    },
    {
      label: "$.storagemaxitems",
      kind: CompletionItemKind.Variable,
      detail: "Max amount of items in storage",
    },
    {
      label: "$.param[N]",
      kind: CompletionItemKind.Variable,
      detail: "Command line parameters (see Syntax)",
    },
    {
      label: "$.caller",
      kind: CompletionItemKind.Variable,
      detail: "Name of last automacro enabled",
    },
    {
      label: "a",
      kind: CompletionItemKind.Function,
      detail: "Attack a monster.",
    },
    {
      label: "achieve",
      kind: CompletionItemKind.Function,
      detail: "Achievement management",
    },
    {
      label: "ai",
      kind: CompletionItemKind.Function,
      detail: "Enable/disable AI.",
    },
    {
      label: "aiv",
      kind: CompletionItemKind.Function,
      detail: "Display current AI sequences.",
    },
    {
      label: "al",
      kind: CompletionItemKind.Function,
      detail: "Display the status of your vending shop.",
    },
    {
      label: "analysis",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "arrowcraft",
      kind: CompletionItemKind.Function,
      detail: "Create Arrows.",
    },
    {
      label: "as",
      kind: CompletionItemKind.Function,
      detail: "Stop attacking a monster.",
    },
    {
      label: "attendance",
      kind: CompletionItemKind.Function,
      detail: "Attendance System.",
    },
    {
      label: "au",
      kind: CompletionItemKind.Function,
      detail: "Display possible commands for auction.",
    },
    {
      label: "aua",
      kind: CompletionItemKind.Function,
      detail: "Adds an item to the auction.",
    },
    {
      label: "aub",
      kind: CompletionItemKind.Function,
      detail: "Bids an auction.",
    },
    {
      label: "auc",
      kind: CompletionItemKind.Function,
      detail: "Creates an auction.",
    },
    {
      label: "aud",
      kind: CompletionItemKind.Function,
      detail: "Deletes an auction.",
    },
    {
      label: "aue",
      kind: CompletionItemKind.Function,
      detail: "Ends an auction.",
    },
    {
      label: "aui",
      kind: CompletionItemKind.Function,
      detail: "Displays your auction info.",
    },
    {
      label: "aur",
      kind: CompletionItemKind.Function,
      detail: "Removes item from auction.",
    },
    {
      label: "aus",
      kind: CompletionItemKind.Function,
      detail: "Search for an auction according to the criteria.",
    },
    {
      label: "auth",
      kind: CompletionItemKind.Function,
      detail: "(Un)authorize a user for using Kore chat commands.",
    },
    {
      label: "autobuy",
      kind: CompletionItemKind.Function,
      detail: "Initiate auto-buy AI sequence.",
    },
    {
      label: "autosell",
      kind: CompletionItemKind.Function,
      detail: "Auto-sell AI sequence.",
    },
    {
      label: "autostorage",
      kind: CompletionItemKind.Function,
      detail: "Initiate auto-storage AI sequence.",
    },
    {
      label: "bangbang",
      kind: CompletionItemKind.Function,
      detail: "Does a bangbang body turn.",
    },
    {
      label: "bank",
      kind: CompletionItemKind.Function,
      detail: "Banking management.",
    },
    {
      label: "bg",
      kind: CompletionItemKind.Function,
      detail: "Send a message in the battlegrounds chat.",
    },
    {
      label: "bingbing",
      kind: CompletionItemKind.Function,
      detail: "Does a bingbing body turn.",
    },
    {
      label: "bl",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "booking",
      kind: CompletionItemKind.Function,
      detail: "Interact with a group booking",
    },
    {
      label: "bs",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "buy",
      kind: CompletionItemKind.Function,
      detail: "Buy an item from the current NPC shop",
    },
    {
      label: "buyer",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "c",
      kind: CompletionItemKind.Function,
      detail: "Chat in the public chat.",
    },
    {
      label: "canceltransaction",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "captcha",
      kind: CompletionItemKind.Function,
      detail: "Answer captcha",
    },
    {
      label: "card",
      kind: CompletionItemKind.Function,
      detail: "Card compounding.",
    },
    {
      label: "cart",
      kind: CompletionItemKind.Function,
      detail: "Cart management",
    },
    {
      label: "cash",
      kind: CompletionItemKind.Function,
      detail: "Cash shop management",
    },
    {
      label: "cashbuy",
      kind: CompletionItemKind.Function,
      detail: "Buy Cash item",
    },
    {
      label: "charselect",
      kind: CompletionItemKind.Function,
      detail: "Ask server to exit to the character selection screen.",
    },
    {
      label: "chat",
      kind: CompletionItemKind.Function,
      detail: "Chat room management.",
    },
    {
      label: "chist",
      kind: CompletionItemKind.Function,
      detail: "Display last few entries from the chat log.",
    },
    {
      label: "cil",
      kind: CompletionItemKind.Function,
      detail: "Clear the item log.",
    },
    {
      label: "cl",
      kind: CompletionItemKind.Function,
      detail: "Chat room management.",
    },
    {
      label: "clan",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "clearlog",
      kind: CompletionItemKind.Function,
      detail: "Clear the chat log.",
    },
    {
      label: "cln",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "closebuyershop",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "closebuyshop",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "closeshop",
      kind: CompletionItemKind.Function,
      detail: "Close your vending shop.",
    },
    {
      label: "cm",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "conf",
      kind: CompletionItemKind.Function,
      detail: "Change a configuration key",
    },
    {
      label: "connect",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "cook",
      kind: CompletionItemKind.Function,
      detail: "Attempt to create a food item.",
    },
    {
      label: "create",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "damage",
      kind: CompletionItemKind.Function,
      detail: "Damage taken report",
    },
    {
      label: "dead",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "deal",
      kind: CompletionItemKind.Function,
      detail: "Trade items with another player.",
    },
    {
      label: "debug",
      kind: CompletionItemKind.Function,
      detail: "Toggle debug on/off.",
    },
    {
      label: "dl",
      kind: CompletionItemKind.Function,
      detail: "List items in the current deal.",
    },
    {
      label: "doridori",
      kind: CompletionItemKind.Function,
      detail: "Does a doridori head turn.",
    },
    {
      label: "drop",
      kind: CompletionItemKind.Function,
      detail: "Drop an item from the inventory.",
    },
    {
      label: "dump",
      kind: CompletionItemKind.Function,
      detail: "Dump the current packet receive buffer and quit.",
    },
    {
      label: "dumpnow",
      kind: CompletionItemKind.Function,
      detail: "Dump the current packet receive buffer without quitting.",
    },
    {
      label: "e",
      kind: CompletionItemKind.Function,
      detail: "Show emotion.",
    },
    {
      label: "east",
      kind: CompletionItemKind.Function,
      detail: "Move 5 steps east.",
    },
    {
      label: "elemental",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "eq",
      kind: CompletionItemKind.Function,
      detail: "Equip an item.",
    },
    {
      label: "eqsw",
      kind: CompletionItemKind.Function,
      detail: "Equip an switch item.",
    },
    {
      label: "eval",
      kind: CompletionItemKind.Function,
      detail: "Evaluate a Perl expression.",
    },
    {
      label: "eventMacro",
      kind: CompletionItemKind.Function,
      detail: "eventMacro plugin",
    },
    {
      label: "exp",
      kind: CompletionItemKind.Function,
      detail: "Experience report.",
    },
    {
      label: "falcon",
      kind: CompletionItemKind.Function,
      detail: "Falcon status.",
    },
    {
      label: "follow",
      kind: CompletionItemKind.Function,
      detail: "Follow another player.",
    },
    {
      label: "friend",
      kind: CompletionItemKind.Function,
      detail: "Friend management.",
    },
    {
      label: "g",
      kind: CompletionItemKind.Function,
      detail: "Chat in the guild chat.",
    },
    {
      label: "getcharname",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "getplayerinfo",
      kind: CompletionItemKind.Function,
      detail: "Get the name of the player with specified ID",
    },
    {
      label: "gmb",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "gmbb",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "gmcreate",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "gmdc",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "gmhide",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "gmkickall",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "gmlb",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "gmlbb",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "gmlnb",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "gmmapmove",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "gmmute",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "gmnb",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "gmrecall",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "gmremove",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "gmresetskill",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "gmresetstate",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "gmsummon",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "gmunmute",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "gmwarpto",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "guild",
      kind: CompletionItemKind.Function,
      detail: "Guild management.",
    },
    {
      label: "help",
      kind: CompletionItemKind.Function,
      detail: "Help displays commands",
    },
    {
      label: "homun",
      kind: CompletionItemKind.Function,
      detail: "Interact with homunculus.",
    },
    {
      label: "i",
      kind: CompletionItemKind.Function,
      detail: "Display inventory items.",
    },
    {
      label: "iconf",
      kind: CompletionItemKind.Function,
      detail: "edit items_control.txt",
    },
    {
      label: "identify",
      kind: CompletionItemKind.Function,
      detail: "Identify an unindentified item.",
    },
    {
      label: "ignore",
      kind: CompletionItemKind.Function,
      detail: "Ignore a user (block their messages).",
    },
    {
      label: "ihist",
      kind: CompletionItemKind.Function,
      detail: "Displays last few entries of the item log.",
    },
    {
      label: "il",
      kind: CompletionItemKind.Function,
      detail: "Display items on the ground.",
    },
    {
      label: "im",
      kind: CompletionItemKind.Function,
      detail: "Use item on monster.",
    },
    {
      label: "ip",
      kind: CompletionItemKind.Function,
      detail: "Use item on player.",
    },
    {
      label: "is",
      kind: CompletionItemKind.Function,
      detail: "Use item on yourself.",
    },
    {
      label: "kill",
      kind: CompletionItemKind.Function,
      detail: "Attack another player (PVP/GVG only).",
    },
    {
      label: "look",
      kind: CompletionItemKind.Function,
      detail: "Look in a certain direction.",
    },
    {
      label: "lookp",
      kind: CompletionItemKind.Function,
      detail: "Look at a certain player.",
    },
    {
      label: "mail",
      kind: CompletionItemKind.Function,
      detail: "Mailbox use (not Rodex)",
    },
    {
      label: "mconf",
      kind: CompletionItemKind.Function,
      detail: "edit mon_control.txt",
    },
    {
      label: "memo",
      kind: CompletionItemKind.Function,
      detail: "Save current position for warp portal.",
    },
    {
      label: "memorial",
      kind: CompletionItemKind.Function,
      detail: "ARRAY(0xca1209c)",
    },
    {
      label: "merc",
      kind: CompletionItemKind.Function,
      detail: "Interact with Mercenary.",
    },
    {
      label: "merge",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "misc_conf",
      kind: CompletionItemKind.Function,
      detail: "Send to Server Misc Configuration.",
    },
    {
      label: "ml",
      kind: CompletionItemKind.Function,
      detail: "List monsters that are on screen.",
    },
    {
      label: "move",
      kind: CompletionItemKind.Function,
      detail: "Move your character.",
    },
    {
      label: "nc",
      kind: CompletionItemKind.Function,
      detail: "NPC Create.",
    },
    {
      label: "nl",
      kind: CompletionItemKind.Function,
      detail: "List NPCs that are on screen.",
    },
    {
      label: "north",
      kind: CompletionItemKind.Function,
      detail: "Move 5 steps north.",
    },
    {
      label: "northeast",
      kind: CompletionItemKind.Function,
      detail: "Move 5 steps northeast.",
    },
    {
      label: "northwest",
      kind: CompletionItemKind.Function,
      detail: "Move 5 steps northwest.",
    },
    {
      label: "openbuyershop",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "openshop",
      kind: CompletionItemKind.Function,
      detail: "Open your vending shop.",
    },
    {
      label: "p",
      kind: CompletionItemKind.Function,
      detail: "Chat in the party chat.",
    },
    {
      label: "party",
      kind: CompletionItemKind.Function,
      detail: "Party management.",
    },
    {
      label: "pause",
      kind: CompletionItemKind.Function,
      detail: "Delay the next console commands.",
    },
    {
      label: "pconf",
      kind: CompletionItemKind.Function,
      detail: "edit pickupitems.txt",
    },
    {
      label: "pecopeco",
      kind: CompletionItemKind.Function,
      detail: "Pecopeco status.",
    },
    {
      label: "pet",
      kind: CompletionItemKind.Function,
      detail: "Pet management.",
    },
    {
      label: "petl",
      kind: CompletionItemKind.Function,
      detail: "List pets that are on screen.",
    },
    {
      label: "pl",
      kind: CompletionItemKind.Function,
      detail: "List players that are on screen.",
    },
    {
      label: "plugin",
      kind: CompletionItemKind.Function,
      detail: "Control plugins.",
    },
    {
      label: "pm",
      kind: CompletionItemKind.Function,
      detail: "Send a private message.",
    },
    {
      label: "pml",
      kind: CompletionItemKind.Function,
      detail: "Quick PM list.",
    },
    {
      label: "poison",
      kind: CompletionItemKind.Function,
      detail: "Apply Poison in Weapon.",
    },
    {
      label: "portals",
      kind: CompletionItemKind.Function,
      detail: "List portals that are on screen.",
    },
    {
      label: "priconf",
      kind: CompletionItemKind.Function,
      detail: "edit priority.txt",
    },
    {
      label: "quest",
      kind: CompletionItemKind.Function,
      detail: "Quest management.",
    },
    {
      label: "quit",
      kind: CompletionItemKind.Function,
      detail: "Exit this program.",
    },
    {
      label: "rc",
      kind: CompletionItemKind.Function,
      detail: "Reload source code files.",
    },
    {
      label: "rc2",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "refine",
      kind: CompletionItemKind.Function,
      detail: "Refine an item (using the whitesmith skill)",
    },
    {
      label: "refineui",
      kind: CompletionItemKind.Function,
      detail: "",
    },
    {
      label: "reload",
      kind: CompletionItemKind.Function,
      detail: "Reload configuration files.",
    },
    {
      label: "relog",
      kind: CompletionItemKind.Function,
      detail: "Log out then log in again.",
    },
    {
      label: "repair",
      kind: CompletionItemKind.Function,
      detail: "Repair players items.",
    },
    {
      label: "reputation",
      kind: CompletionItemKind.Function,
      detail: "Show the Reputation Status",
    },
    {
      label: "respawn",
      kind: CompletionItemKind.Function,
      detail: "Respawn back to the save point.",
    },
    {
      label: "revive",
      kind: CompletionItemKind.Function,
      detail: "Use of the Token Of Siegfried to self-revive.",
    },
    {
      label: "rodex",
      kind: CompletionItemKind.Function,
      detail: "rodex use (Ragnarok Online Delivery Express)",
    },
    {
      label: "roulette",
      kind: CompletionItemKind.Function,
      detail: "Roulette System.",
    },
    {
      label: "s",
      kind: CompletionItemKind.Function,
      detail: "Display character status.",
    },
    {
      label: "sconf",
      kind: CompletionItemKind.Function,
      detail: "edit shop.txt",
    },
    {
      label: "searchstore",
      kind: CompletionItemKind.Function,
      detail: "Universal catalog command",
    },
    {
      label: "sell",
      kind: CompletionItemKind.Function,
      detail: "Sell items to an NPC.",
    },
    {
      label: "send",
      kind: CompletionItemKind.Function,
      detail: "Send a raw packet to the server.",
    },
    {
      label: "showeq",
      kind: CompletionItemKind.Function,
      detail: "Equipment showing.",
    },
    {
      label: "simulate",
      kind: CompletionItemKind.Function,
      detail: "captchaSolve simulate captcha request",
    },
    {
      label: "sit",
      kind: CompletionItemKind.Function,
      detail: "Sit down.",
    },
    {
      label: "skills",
      kind: CompletionItemKind.Function,
      detail: "Skills management.",
    },
    {
      label: "sl",
      kind: CompletionItemKind.Function,
      detail: "Use skill on location.",
    },
    {
      label: "sll",
      kind: CompletionItemKind.Function,
      detail: "Display a list of slaves in your immediate area.",
    },
    {
      label: "sm",
      kind: CompletionItemKind.Function,
      detail: "Use skill on monster.",
    },
    {
      label: "south",
      kind: CompletionItemKind.Function,
      detail: "Move 5 steps south.",
    },
    {
      label: "southeast",
      kind: CompletionItemKind.Function,
      detail: "Move 5 steps southeast.",
    },
    {
      label: "southwest",
      kind: CompletionItemKind.Function,
      detail: "Move 5 steps southwest.",
    },
    {
      label: "sp",
      kind: CompletionItemKind.Function,
      detail: "Use skill on player.",
    },
    {
      label: "spells",
      kind: CompletionItemKind.Function,
      detail: "List area effect spells on screen.",
    },
    {
      label: "ss",
      kind: CompletionItemKind.Function,
      detail: "Use skill on self.",
    },
    {
      label: "ssl",
      kind: CompletionItemKind.Function,
      detail: "Use skill on slave.",
    },
    {
      label: "ssp",
      kind: CompletionItemKind.Function,
      detail: "Use skill on ground spell.",
    },
    {
      label: "st",
      kind: CompletionItemKind.Function,
      detail: "Display stats.",
    },
    {
      label: "stand",
      kind: CompletionItemKind.Function,
      detail: "Stand up.",
    },
    {
      label: "starplace",
      kind: CompletionItemKind.Function,
      detail: "Starplace Agree",
    },
    {
      label: "stat_add",
      kind: CompletionItemKind.Function,
      detail: "Add status point.",
    },
    {
      label: "storage",
      kind: CompletionItemKind.Function,
      detail: "Handle items in Kafra storage.",
    },
    {
      label: "store",
      kind: CompletionItemKind.Function,
      detail: "Display shop items from NPC.",
    },
    {
      label: "switch_equips",
      kind: CompletionItemKind.Function,
      detail: "Switch Equips",
    },
    {
      label: "switchconf",
      kind: CompletionItemKind.Function,
      detail: "Switch configuration file.",
    },
    {
      label: "take",
      kind: CompletionItemKind.Function,
      detail: "Take an item from the ground.",
    },
    {
      label: "talk",
      kind: CompletionItemKind.Function,
      detail: "Manually talk to an NPC.",
    },
    {
      label: "talknpc",
      kind: CompletionItemKind.Function,
      detail: "Send a sequence of responses to an NPC.",
    },
    {
      label: "tank",
      kind: CompletionItemKind.Function,
      detail: "Tank for a player.",
    },
    {
      label: "tele",
      kind: CompletionItemKind.Function,
      detail: "Teleport to a random location.",
    },
    {
      label: "testshop",
      kind: CompletionItemKind.Function,
      detail: "Show what your vending shop would sell.",
    },
    {
      label: "timeout",
      kind: CompletionItemKind.Function,
      detail: "Set a timeout.",
    },
    {
      label: "top10",
      kind: CompletionItemKind.Function,
      detail: "Displays top10 ranking.",
    },
    {
      label: "uneq",
      kind: CompletionItemKind.Function,
      detail: "Unequp an item.",
    },
    {
      label: "uneqsw",
      kind: CompletionItemKind.Function,
      detail: "Unequp an switch item.",
    },
    {
      label: "vender",
      kind: CompletionItemKind.Function,
      detail: "Buy items from vending shops.",
    },
    {
      label: "version",
      kind: CompletionItemKind.Function,
      detail: "Display the version of openkore.",
    },
    {
      label: "vl",
      kind: CompletionItemKind.Function,
      detail: "List nearby vending shops.",
    },
    {
      label: "vs",
      kind: CompletionItemKind.Function,
      detail: "Display the status of your vending shop.",
    },
    {
      label: "warp",
      kind: CompletionItemKind.Function,
      detail: "Open warp portal.",
    },
    {
      label: "weight",
      kind: CompletionItemKind.Function,
      detail: "Gives a report about your inventory weight.",
    },
    {
      label: "west",
      kind: CompletionItemKind.Function,
      detail: "Move 5 steps west.",
    },
    {
      label: "where",
      kind: CompletionItemKind.Function,
      detail: "Shows your current location.",
    },
    {
      label: "who",
      kind: CompletionItemKind.Function,
      detail: "Display the number of people on the current server.",
    },
    {
      label: "whoami",
      kind: CompletionItemKind.Function,
      detail: "Display your character and account ID.",
    },
  ];
});

connection.onHover((params) => {
  const doc = documents.get(params.textDocument.uri);
  const word = getWordAtPosition(doc.getText(), params.position);

  const hoverDocs = {
    call: {
      contents:
        "```macro\ncall macroname [parameters]\n```\nCalls a macro and resumes after it finishes.",
    },
    release: {
      contents:
        "```macro\nrelease (name | all)\n```\nReenables a locked automacro or all.",
    },
    lock: {
      contents:
        "```macro\nlock (name | all)\n```\nLocks an automacro and disables checks.",
    },
    stop: {
      contents:
        "```macro\nstop\n```\nImmediately terminates the running macro.",
    },
    include: {
      contents:
        "```macro\ninclude (on | off | list) [filename | pattern]\n```\nControls !include behavior.",
    },
    set: {
      contents:
        "```macro\nset option value\n```\nSets macro options like macro_delay, overrideAI, etc.",
    },
    "&defined": {
      contents:
        "```macro\n&defined($variable)\n```\nReturns 1 if the variable exists, else 0.",
    },
    "&push": {
      contents:
        "```macro\n&push(@array, newmember)\n```\nAdds newmember to the end of @array.",
    },
    "&pop": {
      contents:
        "```macro\n&pop(@array)\n```\nRemoves the last element from @array.",
    },
    "&shift": {
      contents:
        "```macro\n&shift(@array)\n```\nRemoves the first element from @array.",
    },
    "&unshift": {
      contents:
        "```macro\n&unshift(@array, newmember)\n```\nAdds newmember to the beginning of @array.",
    },
    "&delete": {
      contents:
        "```macro\n&delete($hash{key})\n```\nDeletes a key from a hash.",
    },
    "&exists": {
      contents:
        "```macro\n&exists($hash{key})\n```\nReturns 1 if a key in hash exists, else 0.",
    },
    do: {
      contents: {
        kind: "markdown",
        value:
          "**do command**\n\nRun `command`, as if it was entered in OpenKore terminal. Commands are from Console Commands.",
      },
    },
    log: {
      contents: {
        kind: "markdown",
        value: "**log text**\n\nPrints a text in the console.",
      },
    },
    warning: {
      contents: {
        kind: "markdown",
        value: "**warning text**\n\nPrints a warning in the console.",
      },
    },
    error: {
      contents: {
        kind: "markdown",
        value: "**error text**\n\nPrints an error in the console.",
      },
    },
    pause: {
      contents: {
        kind: "markdown",
        value:
          "**pause [n]**\n\nPauses all character actions for `n` seconds. If omitted, it pauses indefinitely.",
      },
    },
    call: {
      contents: {
        kind: "markdown",
        value:
          "**call macroname [parameters]**\n\nCalls macro `macroname` with optional parameters. When it finishes, the current macro continues.",
      },
    },
    release: {
      contents: {
        kind: "markdown",
        value:
          "**release (name | all)**\n\nReenables a locked automacro or all automacros using `release all`.",
      },
    },
    lock: {
      contents: {
        kind: "markdown",
        value:
          "**lock (name | all)**\n\nLocks an automacro and disables its checks. Use `lock all` to lock all automacros.",
      },
    },
    stop: {
      contents: {
        kind: "markdown",
        value: "**stop**\n\nImmediately terminates the running macro.",
      },
    },
    include: {
      contents: {
        kind: "markdown",
        value:
          "**include (on | off | list) [filename | pattern]**\n\nEnables or disables `!include` in eventMacros file.",
      },
    },
    set: {
      contents: {
        kind: "markdown",
        value:
          "**set option value**\n\nSets macro features:\n- `orphan method`\n- `macro_delay timeout`\n- `overrideAI [0|1]`\n- `repeat times`\n- `exclusive [0|1]`",
      },
    },
    automacro: {
      contents: {
        kind: "markdown",
        value: "automacro name\n\nBlock to define conditions to call a macro.",
      },
    },
    macro: {
      contents: {
        kind: "markdown",
        value: "macro name\n\nBlock to define the instructions.",
      },
    },
    delay: {
      contents: {
        kind: "markdown",
        value:
          "delay seconds\n\nDefines the time in seconds to wait before executing the macro in call parameter.",
      },
    },
    "run-once": {
      contents: {
        kind: "markdown",
        value:
          "run-once boolean\n\nDefines if the automacro can activate only once, or multiple times.",
      },
    },
    CheckOnAI: {
      contents: {
        kind: "markdown",
        value:
          "CheckOnAI [auto, manual, off]\n\nDefines in which AI states the automacro can activate.",
      },
    },
    disabled: {
      contents: {
        kind: "markdown",
        value: "disabled boolean\n\nDefines if the automacro is active or not.",
      },
    },
    overrideAI: {
      contents: {
        kind: "markdown",
        value:
          "overrideAI boolean\n\nDefines if eventMacro will put itself in the AI queue.",
      },
    },
    exclusive: {
      contents: {
        kind: "markdown",
        value:
          "exclusive boolean\n\nDefines if the macro can be interrupted or not.",
      },
    },
    priority: {
      contents: {
        kind: "markdown",
        value:
          "priority number\n\nDefines the activation priority between all automacros. Lower = sooner.",
      },
    },
    macro_delay: {
      contents: {
        kind: "markdown",
        value:
          "macro_delay number\n\nDefines the time in seconds to wait between macro commands.",
      },
    },
    orphan: {
      contents: {
        kind: "markdown",
        value:
          "orphan [terminate | reregister | reregister_safe | terminate_last_call]\n\nDefines how eventMacro handles leftover macros when cleared from the AI queue.",
      },
    },
    timeout: {
      contents: {
        kind: "markdown",
        value:
          "timeout number\n\nTime in seconds before this automacro can activate again.",
      },
    },
    "&questStatus": {
      contents:
        "Returns the status of quest questID as a string (inactive, incomplete or complete).",
    },
    "&questInactiveCount": {
      contents:
        'Returns the number of given quests which have status "inactive".',
    },
    "&questIncompleteCount": {
      contents:
        'Returns the number of given quests which have status "incomplete".',
    },
    "&questCompleteCount": {
      contents:
        'Returns the number of given quests which have status "complete".',
    },
    "&inventory": {
      contents:
        "Returns inventory item index of item|ID. Returns -1 if not found.",
    },
    "&Inventory": {
      contents:
        "Same as &inventory but returns all matching indexes as a comma-separated list or -1 if not found.",
    },
    "&invamount": {
      contents: "Returns the amount of the given item|ID in inventory.",
    },
    "&InventoryType": {
      contents:
        "Returns a comma-separated list with all items of the specified type (usable, equip, card, etc).",
    },
    "&cart": {
      contents: "Returns cart item index of item|ID. Returns -1 if not found.",
    },
    "&Cart": {
      contents:
        "Same as &cart but returns all matching indexes as a comma-separated list or -1 if not found.",
    },
    "&cartamount": {
      contents: "Returns the amount of the given item|ID in cart.",
    },
    "&storage": {
      contents:
        "Returns storage item index of item|ID. Returns -1 if not found.",
    },
    "&Storage": {
      contents:
        "Same as &storage but returns all matching indexes as a comma-separated list or -1 if not found.",
    },
    "&storamount": {
      contents: "Returns the amount of the given item|ID in storage.",
    },
    "&venderitem": {
      contents:
        "Looks for an item in a player's shop and returns index or -1 if not found.",
    },
    "&venderprice": {
      contents: "Looks for an item in a player's shop and returns its price.",
    },
    "&venderamount": {
      contents: "Returns the amount of the given item in a player's shop.",
    },
    "&store": {
      contents:
        "Looks for an item in a store and returns index or -1 if not found.",
    },
    "&shopamount": {
      contents: "Returns the amount of the given item in shop.",
    },
    "&npc": {
      contents:
        "Returns NPC index by location x y, regexp match, or name. Returns -1 if not found.",
    },
    "&player": {
      contents: "Returns player index of name. Returns -1 if not found.",
    },
    "&monster": {
      contents: "Returns monster index of name|ID. Returns -1 if not found.",
    },
    "&vender": {
      contents: "Returns vender index of name. Returns -1 if not found.",
    },
    "&config": {
      contents: "Returns the value of variable specified in config.txt.",
    },
    "&random": { contents: "Returns randomly one of the given arguments." },
    "&rand": { contents: "Returns a random number between n and m." },
    "&eval": {
      contents: "Evaluates Perl code in argument. Limited to macro syntax.",
    },
    "&arg": {
      contents:
        "Returns the nth word of argument or an empty string if out of range.",
    },
    "&nick": { contents: "Escapes special characters in a name string." },
    "&split": { contents: "Creates array from variable using a separator." },
    "&keys": { contents: "Creates an array from the keys of a hash." },
    "&values": { contents: "Creates an array from the values of a hash." },
    "&listlength": {
      contents: "Returns the length of a comma-separated list.",
    },
    "&strip": { contents: "Removes parentheses from text." },
    "$.time": { contents: "Current time as Unix timestamp" },
    "$.datetime": { contents: "Current date and time" },
    "$.second": { contents: "Current second time (0 - 59)" },
    "$.minute": { contents: "Current minute time (0 - 59)" },
    "$.hour": { contents: "Current hour time in 24h format" },
    "$.dayofmonth": { contents: "Current day of month" },
    "$.dayofweek": {
      contents: "Current day of week (e.g. Monday, Tuesday, ...)",
    },
    "$.map": { contents: "The map you're currently in" },
    "$.incity": {
      contents: "Boolean: { contents: 1 if at a city, 0 otherwise",
    },
    "$.inlockmap": {
      contents: "Boolean: { contents: 1 if at a lockMap, 0 otherwise",
    },
    "$.job": { contents: "The current character job" },
    "$.pos": { contents: "Your current position" },
    "$.name": { contents: "The character name" },
    "$.hp": { contents: "Current HP" },
    "$.sp": { contents: "Current SP" },
    "$.lvl": { contents: "Current base level" },
    "$.joblvl": { contents: "Current job level" },
    "$.spirits": {
      contents: "Number of current spirit spheres or Coin Flip's coins",
    },
    "$.zeny": { contents: "Current zeny" },
    "$.weight": { contents: "Current character weight" },
    "$.weightpercent": { contents: "Current character weight in percentage" },
    "$.maxweight": { contents: "Current maximum character weight" },
    "$.status": {
      contents:
        "Current statuses (comma-separated) e.g. Attention Concentrate, Endure",
    },
    "$.statushandle": {
      contents:
        "Status handles (comma-separated) e.g. SM_ENDURE, KN_TWOHANDQUICKEN",
    },
    "$.inventoryitems": { contents: "Number of items in inventory" },
    "$.cartweight": { contents: "Current cart weight" },
    "$.cartweightpercent": { contents: "Cart weight as percentage" },
    "$.cartmaxweight": { contents: "Max cart weight" },
    "$.cartitems": { contents: "Number of items in cart" },
    "$.cartmaxitems": { contents: "Max number of cart items" },
    "$.shopopen": { contents: "1 if shop is opened, 0 otherwise" },
    "$.storageopen": { contents: "1 if storage is opened, 0 otherwise" },
    "$.storageitems": { contents: "Number of items in storage" },
    "$.storagemaxitems": { contents: "Max number of storage items" },
    "$.param[N]": {
      contents: "Command line parameters (e.g. $.param[0], $.param[1])",
    },
    "$.caller": { contents: "Name of last automacro enabled" },
    BaseLevel: { contents: "Checks the player base level." },
    JobLevel: { contents: "Checks the player job level." },
    CartCurrentWeight: { contents: "Checks the player's cart current weight." },
    CartMaxWeight: { contents: "Checks the player's cart max weight." },
    CartCurrentSize: {
      contents: "Checks the player's cart current item quantity.",
    },
    CartMaxSize: { contents: "Checks the player's cart max item quantity." },
    CharCurrentWeight: { contents: "Checks the player's current weight." },
    CharMaxWeight: { contents: "Checks the player's max weight." },
    FreeStatPoints: { contents: "Checks the player's free stat points." },
    FreeSkillPoints: { contents: "Checks the player's free skill points." },
    CurrentHP: { contents: "Checks the player's current hp." },
    MaxHP: { contents: "Checks the player's max hp." },
    CurrentSP: { contents: "Checks the player's current sp." },
    MaxSP: { contents: "Checks the player's max sp." },
    InInventory: {
      contents:
        "Checks if the player has a certain quantity of an item in the inventory, uses item name.",
    },
    InInventoryID: {
      contents:
        "Checks if the player has a certain quantity of an item in the inventory, uses item ID.",
    },
    InStorage: {
      contents:
        "Checks if the player has a certain quantity of an item in the storage, uses item name.",
    },
    InStorageID: {
      contents:
        "Checks if the player has a certain quantity of an item in the storage, uses item ID.",
    },
    InCart: {
      contents:
        "Checks if the player has a certain quantity of an item in the cart, uses item name.",
    },
    InCartID: {
      contents:
        "Checks if the player has a certain quantity of an item in the cart, uses item ID.",
    },
    InventoryCurrentSize: { contents: "Checks the player current item count." },
    SkillLevel: {
      contents:
        "Checks if the player has a certain level of a certain skill, uses skill Id or Handle.",
    },
    Zeny: { contents: "Checks the player current zeny." },
    StorageOpened: {
      contents:
        "Is true if storage is opened and it is set to 1 or storage is not opened and it is set to 0.",
    },
    ShopOpened: {
      contents:
        "Is true if your vending shop is opened and it is set to 1 or your vending shop is not opened and it is set to 0.",
    },
    InChatRoom: {
      contents:
        "Is true if you are in a chat room and it is set to 1 or you are not in a chat room and it is set to 0.",
    },
    ChatRoomNear: {
      contents:
        "Checks if there is a npc near which name matches the given regex.",
    },
    InMap: {
      contents: "Checks if the current map match one of the given maps.",
    },
    InLockMap: {
      contents:
        "Is true if you are in lockmap and it is set to 1 or you are not in lockmap and it is set to 0.",
    },
    InSaveMap: {
      contents:
        "Is true if you are in savemap and it is set to 1 or you are not in savemap and it is set to 0.",
    },
    IsInCoordinate: {
      contents:
        "Checks if the current coordinates match one of the given ones.",
    },
    IsInMapAndCoordinate: {
      contents:
        "Checks if the current map and/or coordinates match one of the given maps.",
    },
    InPvP: {
      contents:
        "Checks if the current pvp type of the map matches the given type.",
    },
    InCity: { contents: "Checks if the player is in a city or not." },
    InMapRegex: {
      contents: "Checks if the current map matches the given regex.",
    },
    NpcNear: {
      contents:
        "Checks if there is a npc near which name matches the given regex.",
    },
    NpcNearDist: {
      contents:
        "Checks if there is a npc in a given distance which name matches the given regex.",
    },
    NpcNotNear: {
      contents:
        "Checks if there's no npc near which name matches the given regex.",
    },
    PlayerNear: {
      contents:
        "Checks if there is a player near which name matches the given regex.",
    },
    PlayerNearDist: {
      contents:
        "Checks if there is a player in a given distance which name matches the given regex.",
    },
    PlayerNotNear: {
      contents:
        "Checks if there's no player near which name matches the given regex.",
    },
    MobNear: {
      contents:
        "Checks if there is a mob near which name matches the given regex.",
    },
    MobNearDist: {
      contents:
        "Checks if there is a mob in a given distance which name matches the given regex.",
    },
    MobNotNear: {
      contents:
        "Checks if there's no mob near which name matches the given regex.",
    },
    JobID: {
      contents:
        "Checks if the Job ID of the current player job matches one of the given ones.",
    },
    JobIDNot: {
      contents:
        "Checks if the Job ID of the current player job does not match the given one.",
    },
    IsEquippedID: {
      contents:
        "Checks if the player has an item equipped which ID matches the given one.",
    },
    IsNotEquippedID: {
      contents:
        "Checks if the player doesn't have an item equipped which ID matches the given one.",
    },
    ConfigKey: {
      contents:
        "Checks if the one or more of the given config keys match it's desired value.",
    },
    ConfigKeyNot: {
      contents:
        "Checks if the at least one of the config key pairs doesn't match their desired value.",
    },
    ConfigKeyNotExist: {
      contents:
        "Checks if the at least one of the config keys doesn't exist in config.txt.",
    },
    InProgressBar: {
      contents: "Checks if the player is waiting for a progress bar to end.",
    },
    StatusActiveHandle: {
      contents:
        "Checks if the player has one of the given status, uses status HANDLE.",
    },
    StatusInactiveHandle: {
      contents:
        "Checks if the player doesn't have one of the given status, uses status HANDLE.",
    },
    QuestActive: {
      contents:
        "Checks if the player has one of the given quests active, uses quest ID.",
    },
    QuestInactive: {
      contents:
        "Checks if the player has of the given quests inactive, uses quest ID.",
    },
    QuestOnTime: {
      contents:
        "Checks if the player has one of the given quests active, and this quest has a timer that hasn't ended yet, uses quest ID.",
    },
    QuestTimeOverdue: {
      contents:
        "Checks if the player has one of the given quests active, and this quest has a timer that has already ended, uses quest ID.",
    },
    QuestHuntCompleted: {
      contents:
        "Checks if the player has one of the given quests active, and this quest has a hunt mission which wasn't completed yet, uses quest ID and Mob ID.",
    },
    QuestHuntOngoing: {
      contents:
        "Checks if the player has one of the given quests active, and this quest has a hunt mission which has not been completed yet, uses quest ID and Mob ID.",
    },
    NoPlayerNear: {
      contents:
        "Checks if there are any players near, it's true when there's none.",
    },
    NoPortalNear: {
      contents:
        "Checks if there are any portals near, it's true when there's none.",
    },
    NoMobNear: {
      contents:
        "Checks if there are any mobs near, it's true when there's none.",
    },
    NoNpcNear: {
      contents:
        "Checks if there are any npcs near, it's true when there's none.",
    },
    PlayerNearCount: {
      contents:
        "Checks if the number of players near match the given math condition.",
    },
    NpcNearCount: {
      contents:
        "Checks if the number of npcs near match the given math condition.",
    },
    MobNearCount: {
      contents:
        "Checks if the number of mobs near match the given math condition.",
    },
    PortalNearCount: {
      contents:
        "Checks if the number of portals near match the given math condition.",
    },
    PubMsg: {
      contents:
        "Is checked on public messages, is true when the message matches the given regex.",
    },
    PubMsgDist: {
      contents:
        "Is checked on public messages, is true when the message matches the given regex and the distance match the given condition.",
    },
    PubMsgName: {
      contents:
        "Is checked on public messages, is true when the message matches the given regex and the name of the player which sent it also matches it's given regex.",
    },
    PubMsgNameDist: {
      contents:
        "Is checked on public messages, is true when the message matches the given regex and the name of the player which sent it also matches it's given regex and the distance matches the condition.",
    },
    PrivMsg: {
      contents:
        "Is checked on private messages, is true when the message matches the given regex.",
    },
    PrivMsgDist: {
      contents:
        "Is checked on private messages, is true when the message matches the given regex and the distance match the given condition.",
    },
    PrivMsgName: {
      contents:
        "Is checked on private messages, is true when the message matches the given regex and the name of the player which sent it also matches it's given regex.",
    },
    PrivMsgNameDist: {
      contents:
        "Is checked on private messages, is true when the message matches the given regex and the name of the player which sent it also matches it's given regex and the distance matches the condition.",
    },
    PartyMsg: {
      contents:
        "Is checked on party messages, is true when the message matches the given regex.",
    },
    PartyMsgDist: {
      contents:
        "Is checked on party messages, is true when the message matches the given regex and the distance match the given condition.",
    },
    PartyMsgName: {
      contents:
        "Is checked on party messages, is true when the message matches the given regex and the name of the player which sent it also matches it's given regex.",
    },
    PartyMsgNameDist: {
      contents:
        "Is checked on party messages, is true when the message matches the given regex and the name of the player which sent it also matches it's given regex and the distance matches the condition.",
    },
    GuildMsg: {
      contents:
        "Is checked on guild messages, is true when the message matches the given regex.",
    },
    GuildMsgDist: {
      contents:
        "Is checked on guild messages, is true when the message matches the given regex and the distance match the given condition.",
    },
    GuildMsgName: {
      contents:
        "Is checked on guild messages, is true when the message matches the given regex and the name of the player which sent it also matches it's given regex.",
    },
    GuildMsgNameDist: {
      contents:
        "Is checked on guild messages, is true when the message matches the given regex and the name of the player which sent it also matches it's given regex and the distance matches the condition.",
    },
    NpcMsg: {
      contents:
        "Is checked on npc conversation messages, is true when the message matches the given regex.",
    },
    NpcMsgDist: {
      contents:
        "Is checked on npc conversation messages, is true when the message matches the given regex and the distance match the given condition.",
    },
    NpcMsgName: {
      contents:
        "Is checked on npc conversation messages, is true when the message matches the given regex and the name of the npc which sent it also matches it's given regex.",
    },
    NpcMsgNameDist: {
      contents:
        "Is checked on npc conversation messages, is true when the message matches the given regex and the name of the npc which sent it also matches it's given regex and the distance matches the condition.",
    },
    LocalMsg: {
      contents:
        "Is checked on local broadcast messages, is true when the message matches the given regex.",
    },
    BusMsg: {
      contents:
        "Is checked on bus system messages, is true when the message matches the given regex.",
    },
    MapLoaded: {
      contents:
        "Is checked everytime a map change event occur (teleport, map changes), is true if the current map match one of the given ones.",
    },
    OnCharLogIn: {
      contents: "Is always true, activates everytime the character logs in.",
    },
    a: {
      contents: {
        kind: "markdown",
        value: "Attack a monster.  monster # attack the specified monster",
      },
    },
    achieve: {
      contents: {
        kind: "markdown",
        value:
          "Achievement management  list shows all current achievements  info achievementID shows information about the achievement  reward achievementID request reward for the achievement of achievementID",
      },
    },
    ai: {
      contents: {
        kind: "markdown",
        value:
          "Enable/disable AI.   toggles AI on/manual/off  on enables AI  off disables AI  manual makes AI manual  ai_v displays the contents of the %ai_v hash, for debugging purposes  clear clears AI sequences  print displays detailed info about current AI sequence",
      },
    },
    aiv: {
      contents: {
        kind: "markdown",
        value: "Display current AI sequences.",
      },
    },
    al: {
      contents: {
        kind: "markdown",
        value: "Display the status of your vending shop.",
      },
    },
    analysis: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    arrowcraft: {
      contents: {
        kind: "markdown",
        value:
          "Create Arrows.   lists available arrow-crafting items  use use the Archers Arrow Craft skill  arrowcraft # create arrows using an item from the arrowcraft list  forceuse inventory item # craft arrows immediately from an item without using the skill",
      },
    },
    as: {
      contents: {
        kind: "markdown",
        value: "Stop attacking a monster.",
      },
    },
    attendance: {
      contents: {
        kind: "markdown",
        value:
          "Attendance System.  open Attendance System  request Request the Current Day Reward",
      },
    },
    au: {
      contents: {
        kind: "markdown",
        value: "Display possible commands for auction.",
      },
    },
    aua: {
      contents: {
        kind: "markdown",
        value:
          "Adds an item to the auction.  inventory item amount adds an item to the auction",
      },
    },
    aub: {
      contents: {
        kind: "markdown",
        value: "Bids an auction.  id price bids an auction",
      },
    },
    auc: {
      contents: {
        kind: "markdown",
        value:
          "Creates an auction.  current price instant buy price hours creates an auction",
      },
    },
    aud: {
      contents: {
        kind: "markdown",
        value: "Deletes an auction.  index deletes an auction",
      },
    },
    aue: {
      contents: {
        kind: "markdown",
        value: "Ends an auction.  index ends an auction",
      },
    },
    aui: {
      contents: {
        kind: "markdown",
        value:
          "Displays your auction info.  selling display selling info  buying display buying info",
      },
    },
    aur: {
      contents: {
        kind: "markdown",
        value: "Removes item from auction.",
      },
    },
    aus: {
      contents: {
        kind: "markdown",
        value:
          "Search for an auction according to the criteria.  type price text Items search criteria. Type: 1 Armor, 2 Weapon, 3 Card, 4 Misc, 5 By Text, 6 By Price, 7 Sell, 8 Buy",
      },
    },
    auth: {
      contents: {
        kind: "markdown",
        value:
          "(Un)authorize a user for using Kore chat commands.  player name 0 unauthorize player name  player name 1 authorize player name",
      },
    },
    autobuy: {
      contents: {
        kind: "markdown",
        value: "Initiate auto-buy AI sequence.",
      },
    },
    autosell: {
      contents: {
        kind: "markdown",
        value:
          "Auto-sell AI sequence.   Initiate auto-sell AI sequence  test Simulate list of items to sell (synonym: simulate or debug)",
      },
    },
    autostorage: {
      contents: {
        kind: "markdown",
        value: "Initiate auto-storage AI sequence.",
      },
    },
    bangbang: {
      contents: {
        kind: "markdown",
        value: "Does a bangbang body turn.",
      },
    },
    bank: {
      contents: {
        kind: "markdown",
        value:
          "Banking management.  open Open Banking Interface  deposit Deposit Zeny in Banking  withdraw Withdraw Zeny from Banking",
      },
    },
    bg: {
      contents: {
        kind: "markdown",
        value:
          "Send a message in the battlegrounds chat.  message send message in the battlegrounds chat",
      },
    },
    bingbing: {
      contents: {
        kind: "markdown",
        value: "Does a bingbing body turn.",
      },
    },
    bl: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    booking: {
      contents: {
        kind: "markdown",
        value: "Interact with a group booking",
      },
    },
    bs: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    buy: {
      contents: {
        kind: "markdown",
        value:
          "Buy an item from the current NPC shop  store item # [amount] buy amount items from the store list",
      },
    },
    buyer: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    c: {
      contents: {
        kind: "markdown",
        value: "Chat in the public chat.  message send message to public chat",
      },
    },
    canceltransaction: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    captcha: {
      contents: {
        kind: "markdown",
        value: "Answer captcha",
      },
    },
    card: {
      contents: {
        kind: "markdown",
        value:
          "Card compounding.  list lists cards in the inventory  use card # initiate card compounding using the specified card  mergelist lists items to merge card with  mergecancel cancel a card merge request  merge card merge # merge card with item and finalize card compounding  forceuse card # inventory item # instantly merge the card with an item",
      },
    },
    cart: {
      contents: {
        kind: "markdown",
        value:
          "Cart management   lists items in cart.  add inventory item # [amount] add amount items from inventory to cart  get cart item # [amount] get amount items from cart to inventory  desc cart item # [amount] displays cart item description",
      },
    },
    cash: {
      contents: {
        kind: "markdown",
        value:
          "Cash shop management  open open Cash shop  close close Cash shop  buy item [amount] [kafra shop points] buy items from Cash shop  points show the number of available Cash shop points  list lists the Cash shop items",
      },
    },
    cashbuy: {
      contents: {
        kind: "markdown",
        value:
          "Buy Cash item  kafra_points item # [amount][, item # [amount]]... buy items from cash dealer",
      },
    },
    charselect: {
      contents: {
        kind: "markdown",
        value: "Ask server to exit to the character selection screen.",
      },
    },
    chat: {
      contents: {
        kind: "markdown",
        value:
          'Chat room management.  list lists chat rooms on screen  join chat room # join a chat room  info displays info about the current chat room  leave leave the current chat room  create "title" [limit # public flag password] create a chat room  modify "title" [limit # public flag password] modify the current chat room  bestow user # bestow admin to chat room user  kick user # kick a chat room user  ',
      },
    },
    chist: {
      contents: {
        kind: "markdown",
        value:
          "Display last few entries from the chat log.   display last 5 entries  number display last number entries",
      },
    },
    cil: {
      contents: {
        kind: "markdown",
        value: "Clear the item log.",
      },
    },
    cl: {
      contents: {
        kind: "markdown",
        value:
          'Chat room management.  list lists chat rooms on screen  join chat room # join a chat room  info displays info about the current chat room  leave leave the current chat room  create "title" [limit # public flag password] create a chat room  modify "title" [limit # public flag password] modify the current chat room  bestow user # bestow admin to chat room user  kick user # kick a chat room user  ',
      },
    },
    clan: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    clearlog: {
      contents: {
        kind: "markdown",
        value: "Clear the chat log.",
      },
    },
    cln: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    closebuyershop: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    closebuyshop: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    closeshop: {
      contents: {
        kind: "markdown",
        value: "Close your vending shop.",
      },
    },
    cm: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    conf: {
      contents: {
        kind: "markdown",
        value:
          "Change a configuration key  key displays value of key  key value sets value of key to value  key none unsets key  label.attribute displays value of the specified configuration key through label  label.attribute value set a new value for the specified configuration key through label  label.attribute none unset the specified configuration key through label  label.block display the current value of the specified block  label.block value set a new value for the specified block through label  labelblock none unset the specified block through label",
      },
    },
    connect: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    cook: {
      contents: {
        kind: "markdown",
        value:
          "Attempt to create a food item.  cook list # attempt to create a food item",
      },
    },
    create: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    damage: {
      contents: {
        kind: "markdown",
        value:
          "Damage taken report   displays the damage taken report  reset resets the damage taken report",
      },
    },
    dead: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    deal: {
      contents: {
        kind: "markdown",
        value:
          "Trade items with another player.   accept an incoming deal/finalize the current deal/trade  player # | player_name request a deal with player  add inventory item # [amount] add items to current deal  add z [amount] add zenny to current deal  no deny an incoming deal/cancel the current deal",
      },
    },
    debug: {
      contents: {
        kind: "markdown",
        value:
          "Toggle debug on/off.  level sets debug level to level  info displays debug information",
      },
    },
    dl: {
      contents: {
        kind: "markdown",
        value: "List items in the current deal.",
      },
    },
    doridori: {
      contents: {
        kind: "markdown",
        value: "Does a doridori head turn.",
      },
    },
    drop: {
      contents: {
        kind: "markdown",
        value:
          "Drop an item from the inventory.  inventory_item_list [amount] drop an item from inventory",
      },
    },
    dump: {
      contents: {
        kind: "markdown",
        value: "Dump the current packet receive buffer and quit.",
      },
    },
    dumpnow: {
      contents: {
        kind: "markdown",
        value: "Dump the current packet receive buffer without quitting.",
      },
    },
    e: {
      contents: {
        kind: "markdown",
        value:
          "Show emotion.  emotion show specified emotion (see tables/emotions.txt)",
      },
    },
    east: {
      contents: {
        kind: "markdown",
        value: "Move 5 steps east.",
      },
    },
    elemental: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    eq: {
      contents: {
        kind: "markdown",
        value:
          "Equip an item.  inventory item # equips the specified item  slotname inventory item # equips the specified item on the specified slot  slots lists slot names",
      },
    },
    eqsw: {
      contents: {
        kind: "markdown",
        value:
          "Equip an switch item.  inventory item # equips the specified item  slotname inventory item # equips the specified item on the specified slot  slots lists slot names",
      },
    },
    eval: {
      contents: {
        kind: "markdown",
        value:
          "Evaluate a Perl expression.  expression evaluate a Perl expression",
      },
    },
    eventMacro: {
      contents: {
        kind: "markdown",
        value: "eventMacro plugin",
      },
    },
    exp: {
      contents: {
        kind: "markdown",
        value:
          "Experience report.   displays the experience report  monster display report on monsters killed  item display report on inventory changes  report display detailed report on experience gained, monsters killed and items gained  reset resets the experience report  output output the experience report in file exp.txt",
      },
    },
    falcon: {
      contents: {
        kind: "markdown",
        value:
          "Falcon status.   displays falcon status  release releases your falcon",
      },
    },
    follow: {
      contents: {
        kind: "markdown",
        value:
          "Follow another player.  player name|player # follow the specified player  stop stop following",
      },
    },
    friend: {
      contents: {
        kind: "markdown",
        value:
          "Friend management.   lists friends  request player name|player # requests player to be your friend  accept accepts a friend request  reject rejects a friend request  pm friend # pm a friend  remove friend # remove a friend from friends list",
      },
    },
    g: {
      contents: {
        kind: "markdown",
        value: "Chat in the guild chat.  message send message to guild chat",
      },
    },
    getcharname: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    getplayerinfo: {
      contents: {
        kind: "markdown",
        value:
          "Get the name of the player with specified ID  player ID show the name of the specified ID (needs debug 2)",
      },
    },
    gmb: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    gmbb: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    gmcreate: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    gmdc: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    gmhide: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    gmkickall: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    gmlb: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    gmlbb: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    gmlnb: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    gmmapmove: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    gmmute: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    gmnb: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    gmrecall: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    gmremove: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    gmresetskill: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    gmresetstate: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    gmsummon: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    gmunmute: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    gmwarpto: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    guild: {
      contents: {
        kind: "markdown",
        value:
          "Guild management.   request guild info  info displays guild info  members displays guild member info  create guild name create a guild  request player name|player # request player to join your guild  join flag accepts a guild join request if flag is 1, deny if 0  ally player name|player # request alliance to another guild  leave leave the guild  kick guild member # reason kick a guild member out of the guild  break  guild name disband your guild",
      },
    },
    help: {
      contents: {
        kind: "markdown",
        value:
          "Help displays commands   lists available commands  command displays detailed information about a command",
      },
    },
    homun: {
      contents: {
        kind: "markdown",
        value:
          "Interact with homunculus.  s display homunculus status  status display homunculus status  feed feed your homunculus. (Food needed)  rename rename your homunculus  fire delete your homunculus  delete delete your homunculus  move x y moves your homunculus  standby  makes your homunculus standby  aiv  display current homunculus AI   ai toggles AI on, off or manual   on  turns homunculus AI on  auto turns homunculus AI on  manual turns homunculus AI to manual  off turns homunculus AI off  clear clears homunculus AI  print prints homunculus AI  skills displays homunculus skills  skills add skill # add a skill point to the current homunculus skill  desc skill # display a description of the specified homunculus skill",
      },
    },
    i: {
      contents: {
        kind: "markdown",
        value:
          "Display inventory items.   display all inventory items.  eq lists equipped items  neq lists unequipped items  nu lists non-usable items  u lists usable items  desc inventory item # displays inventory item description",
      },
    },
    iconf: {
      contents: {
        kind: "markdown",
        value: "edit items_control.txt",
      },
    },
    identify: {
      contents: {
        kind: "markdown",
        value:
          "Identify an unindentified item.   lists items to be identified  identify # identify an item",
      },
    },
    ignore: {
      contents: {
        kind: "markdown",
        value:
          "Ignore a user (block their messages).  flag player name ignores a player if flag is 1, unignore if 0  flag all ignores all players if flag is 1, unignore if 0",
      },
    },
    ihist: {
      contents: {
        kind: "markdown",
        value:
          "Displays last few entries of the item log.   display last 5 entries  number display last number entries",
      },
    },
    il: {
      contents: {
        kind: "markdown",
        value: "Display items on the ground.",
      },
    },
    im: {
      contents: {
        kind: "markdown",
        value:
          "Use item on monster.  inventory item # monster # use item on monster",
      },
    },
    ip: {
      contents: {
        kind: "markdown",
        value:
          "Use item on player.  inventory item # player # use item on player",
      },
    },
    is: {
      contents: {
        kind: "markdown",
        value: "Use item on yourself.  inventory item # use item on yourself",
      },
    },
    kill: {
      contents: {
        kind: "markdown",
        value:
          "Attack another player (PVP/GVG only).  player # attack the specified player",
      },
    },
    look: {
      contents: {
        kind: "markdown",
        value:
          "Look in a certain direction.  body dir [head dir] look at body dir (0-7) with head at head dir (0-2)",
      },
    },
    lookp: {
      contents: {
        kind: "markdown",
        value: "Look at a certain player.  player # look at player",
      },
    },
    mail: {
      contents: {
        kind: "markdown",
        value:
          "Mailbox use (not Rodex)  open open Mailbox  list list your Mailbox  refresh refresh Mailbox  read mail # read the selected mail  get mail # take attachments from mail  setzeny amount|none attach zeny to mail or return it back  add item #|none amount attach item to mail or return it back  send receiver title body send mail to receiver  delete mail # delete selected mail  write start writing a mail  return mail # returns the mail to the sender",
      },
    },
    mconf: {
      contents: {
        kind: "markdown",
        value: "edit mon_control.txt",
      },
    },
    memo: {
      contents: {
        kind: "markdown",
        value: "Save current position for warp portal.",
      },
    },
    memorial: {
      contents: {
        kind: "markdown",
        value: "destroy Destroy an instance.",
      },
    },
    merc: {
      contents: {
        kind: "markdown",
        value:
          "Interact with Mercenary.  s display mercenary status  status display mercenary status  fire fires your mercenary  move x y moves your mercenary  standby makes your mercenary standby  aiv display current mercenary AI  ai toggles AI on, off or manual  on turns mercenary AI on  auto turns mercenary AI on  manual turns mercenary AI to manual  off turns mercenary AI off  clear clears mercenary AI  print prints mercenary AI  skills displays mercenary skills  skills add skill # add a skill point to the current mercenary skill  desc skill # display a description of the specified mercenary skill",
      },
    },
    merge: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    misc_conf: {
      contents: {
        kind: "markdown",
        value:
          "Send to Server Misc Configuration.  show_eq (on|off) Allow / Disable Show Equipment Window  call (on|off) Allow / Disable being Summoned by Urgent Call or Marriage skills  pet_feed (on|off) Enable / Disable Pet Auto-Feed  homun_feed (on|off) Enable / Disable Homunculus Auto-Feed",
      },
    },
    ml: {
      contents: {
        kind: "markdown",
        value: "List monsters that are on screen.",
      },
    },
    move: {
      contents: {
        kind: "markdown",
        value:
          "Move your character.  x y [map name] move to the coordinates on a map  map name move to map  portal # move to nearby portal  stop stop all movement",
      },
    },
    nc: {
      contents: {
        kind: "markdown",
        value:
          "NPC Create.   Create NPC by default name GOLDPCCAFE  name Create NPC by name",
      },
    },
    nl: {
      contents: {
        kind: "markdown",
        value: "List NPCs that are on screen.",
      },
    },
    north: {
      contents: {
        kind: "markdown",
        value: "Move 5 steps north.",
      },
    },
    northeast: {
      contents: {
        kind: "markdown",
        value: "Move 5 steps northeast.",
      },
    },
    northwest: {
      contents: {
        kind: "markdown",
        value: "Move 5 steps northwest.",
      },
    },
    openbuyershop: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    openshop: {
      contents: {
        kind: "markdown",
        value: "Open your vending shop.",
      },
    },
    p: {
      contents: {
        kind: "markdown",
        value: "Chat in the party chat.  message send message to party chat",
      },
    },
    party: {
      contents: {
        kind: "markdown",
        value:
          'Party management.   displays party member info  create "party name" organize a party  share flag sets party EXP sharing to even if flag is 1, individual take if 0  shareitem flag sets party ITEM sharing to even if flag is 1, individual take if 0  sharediv  flag sets party ITEM  PICKUP sharing to even if flag is 1, individual take if 0  shareauto set party EXP sharing auto by AI  request player # request player to join your party  join flag accept a party join request if flag is 1, deny if 0  kick party member # kick party member from party  leave leave the party  ',
      },
    },
    pause: {
      contents: {
        kind: "markdown",
        value:
          "Delay the next console commands.   delay the next console commands for 1 second  seconds delay the next console commands by a specified number of seconds",
      },
    },
    pconf: {
      contents: {
        kind: "markdown",
        value: "edit pickupitems.txt",
      },
    },
    pecopeco: {
      contents: {
        kind: "markdown",
        value:
          "Pecopeco status.   display pecopeco status  release release your pecopeco",
      },
    },
    pet: {
      contents: {
        kind: "markdown",
        value:
          "Pet management.  s displays pet status  status displays pet status  c monster # captures a monster  capture monster # captures a monster  hatch egg # hatches a pet egg, but first you should use the item Pet Incubator  info sends pet menu  feed feeds your pet  performance plays with your pet  return sends your pet back to the egg  unequip unequips your pet  name name changes the name of the pet",
      },
    },
    petl: {
      contents: {
        kind: "markdown",
        value: "List pets that are on screen.",
      },
    },
    pl: {
      contents: {
        kind: "markdown",
        value:
          "List players that are on screen.   lists players on screen  player # displays detailed info about a player  p lists party players on screen  g lists guild players on screen",
      },
    },
    plugin: {
      contents: {
        kind: "markdown",
        value:
          "Control plugins.   lists loaded plugins  load filename loads a plugin file  reload plugin name|plugin # reloads a loaded plugin  unload plugin name|plugin # unloads a loaded plugin  help displays plugin help",
      },
    },
    pm: {
      contents: {
        kind: "markdown",
        value:
          "Send a private message.  player name|PM list # message send message to player through PM",
      },
    },
    pml: {
      contents: {
        kind: "markdown",
        value: "Quick PM list.",
      },
    },
    poison: {
      contents: {
        kind: "markdown",
        value:
          "Apply Poison in Weapon.   lists available Poisons  use use the Guillotine Cross Poisonous Weapon Skill  poison # Apply poison using an item from the poison list",
      },
    },
    portals: {
      contents: {
        kind: "markdown",
        value:
          "List portals that are on screen.   list portals that are on screen  recompile recompile portals  add add new portals: map1 x y map2 x y",
      },
    },
    priconf: {
      contents: {
        kind: "markdown",
        value: "edit priority.txt",
      },
    },
    quest: {
      contents: {
        kind: "markdown",
        value:
          "Quest management.   displays possible commands for quest  set questID on enable quest  set questID off disable quest  list displays a list of your quests  info questID displays quest description",
      },
    },
    quit: {
      contents: {
        kind: "markdown",
        value:
          "Exit this program.   exit this program  2 send a special package quit_request to the server, then exit this program",
      },
    },
    rc: {
      contents: {
        kind: "markdown",
        value:
          "Reload source code files.   reload functions.pl  module names reload module files in the space-separated module names",
      },
    },
    rc2: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    refine: {
      contents: {
        kind: "markdown",
        value:
          "Refine an item (using the whitesmith skill)  (item name|item index) Refine an item (using the whitesmith skill)",
      },
    },
    refineui: {
      contents: {
        kind: "markdown",
        value: "",
      },
    },
    reload: {
      contents: {
        kind: "markdown",
        value:
          "Reload configuration files.  all reload all control and table files  names reload control files in the list of names  all except names reload all files except those in the list of names",
      },
    },
    relog: {
      contents: {
        kind: "markdown",
        value:
          "Log out then log in again.   logout and login after 5 seconds  seconds logout and login after seconds  min..max logout and login after random seconds",
      },
    },
    repair: {
      contents: {
        kind: "markdown",
        value:
          "Repair players items.   list of items available for repair  item # repair the specified players item  cancel cancel repair item",
      },
    },
    reputation: {
      contents: {
        kind: "markdown",
        value: "Show the Reputation Status",
      },
    },
    respawn: {
      contents: {
        kind: "markdown",
        value: "Respawn back to the save point.",
      },
    },
    revive: {
      contents: {
        kind: "markdown",
        value:
          'Use of the Token Of Siegfried to self-revive.   use of the Token Of Siegfried to self-revive  force trying to self-revive using  "item_name" check item_name availability, then trying to self-revive  item_ID check item_ID availability, then trying to self-revive  ',
      },
    },
    rodex: {
      contents: {
        kind: "markdown",
        value:
          "rodex use (Ragnarok Online Delivery Express)  open open rodex mailbox  open 0 | 1 | 2 open rodex mailbox with a specific type  close close rodex mailbox  list list your first page of rodex mail  nextpage request and get the next page of rodex mail  maillist show ALL messages from ALL pages of rodex mail  refresh send request to refresh and update rodex mailbox  read mail_# | mail_id open the selected Rodex mail  getitems get items of current rodex mail  getitems mail_# | mail_id get items of rodex mail  getzeny get zeny of current rodex mail  getzeny mail_# | mail_id get zeny of rodex mail  write open a box to start write a rodex mail  write player_name | self open a box to start write a rodex mail to the specified player  settarget player_name|self set target of rodex mail  itemslist show current list of items in mail box that you are writting  settitle title set rodex mail title  setbody body set rodex mail body  setzeny zeny_amount set zeny amount in rodex mail  add item # amount add a item from inventory in rodex mail box  remove item # amount remove a item or amount of item from rodex mail  draft show draft rodex mail before sending  send send finished rodex mail  cancel close rodex mail write box  delete mail_# | mail_id delete selected rodex mail",
      },
    },
    roulette: {
      contents: {
        kind: "markdown",
        value:
          "Roulette System.  open Open Roulette System  info Send Roulette System Info Request  close Close Roulette System  start Start Roulette System  claim Claim Reward in Roulette System",
      },
    },
    s: {
      contents: {
        kind: "markdown",
        value: "Display character status.",
      },
    },
    sconf: {
      contents: {
        kind: "markdown",
        value: "edit shop.txt",
      },
    },
    searchstore: {
      contents: {
        kind: "markdown",
        value:
          "Universal catalog command  close Closes search store catalog  next Requests catalog next page  view page # Shows catalog page # (0-indexed)  search [match|exact] ... Searches for an item  select page # store # Selects a store  buy [view|end|item # [amount]] Buys from a store using Universal Catalog Gold",
      },
    },
    sell: {
      contents: {
        kind: "markdown",
        value:
          "Sell items to an NPC.  inventory item # [amount] put inventory items in sell list  list show items in the sell list  done sell everything in the sell list  cancel clear the sell list",
      },
    },
    send: {
      contents: {
        kind: "markdown",
        value:
          "Send a raw packet to the server.  hex string sends a raw packet to connected server",
      },
    },
    showeq: {
      contents: {
        kind: "markdown",
        value:
          "Equipment showing.  p index|name|partialname request equipment information for player  me on enables equipment showing  me off disables equipment showing",
      },
    },
    simulate: {
      contents: {
        kind: "markdown",
        value: "captchaSolve simulate captcha request",
      },
    },
    sit: {
      contents: {
        kind: "markdown",
        value: "Sit down.",
      },
    },
    skills: {
      contents: {
        kind: "markdown",
        value:
          "Skills management.   Lists available skills.  add skill # add a skill point  desc skill # displays skill description",
      },
    },
    sl: {
      contents: {
        kind: "markdown",
        value:
          "Use skill on location.  skill # x y [level] use skill on location",
      },
    },
    sll: {
      contents: {
        kind: "markdown",
        value: "Display a list of slaves in your immediate area.",
      },
    },
    sm: {
      contents: {
        kind: "markdown",
        value:
          "Use skill on monster.  skill # monster # [level] use skill on monster",
      },
    },
    south: {
      contents: {
        kind: "markdown",
        value: "Move 5 steps south.",
      },
    },
    southeast: {
      contents: {
        kind: "markdown",
        value: "Move 5 steps southeast.",
      },
    },
    southwest: {
      contents: {
        kind: "markdown",
        value: "Move 5 steps southwest.",
      },
    },
    sp: {
      contents: {
        kind: "markdown",
        value:
          "Use skill on player.  skill # player # [level] use skill on player",
      },
    },
    spells: {
      contents: {
        kind: "markdown",
        value: "List area effect spells on screen.",
      },
    },
    ss: {
      contents: {
        kind: "markdown",
        value:
          "Use skill on self.  skill # [level] use skill on self  start skill # [level] start use skill on self  stop stop use skill on self",
      },
    },
    ssl: {
      contents: {
        kind: "markdown",
        value:
          "Use skill on slave.  skill # target # skill level use skill on slave",
      },
    },
    ssp: {
      contents: {
        kind: "markdown",
        value:
          "Use skill on ground spell.  skill # target # [skill level] use skill on ground spell",
      },
    },
    st: {
      contents: {
        kind: "markdown",
        value: "Display stats.",
      },
    },
    stand: {
      contents: {
        kind: "markdown",
        value: "Stand up.",
      },
    },
    starplace: {
      contents: {
        kind: "markdown",
        value:
          "Starplace Agree  sun select sun as starplace  moon select mon as starplace  star select star as starplace",
      },
    },
    stat_add: {
      contents: {
        kind: "markdown",
        value:
          "Add status point.  str|agi|int|vit|dex|luk add status points to a stat",
      },
    },
    storage: {
      contents: {
        kind: "markdown",
        value:
          "Handle items in Kafra storage.   lists items in storage  eq lists equipments in storage  nu lists non-usable items in storage  u lists usable items in storage  add inventory item # [amount] adds inventory item to storage  addfromcart cart item # [amount] adds cart item to storage  get storage item # [amount] gets item from storage to inventory  gettocart storage item # [amount] gets item from storage to cart  close close storage  log logs storage items to logs/storage.txt",
      },
    },
    store: {
      contents: {
        kind: "markdown",
        value:
          "Display shop items from NPC.   lists available shop items from NPC  desc store item # displays store item description",
      },
    },
    switch_equips: {
      contents: {
        kind: "markdown",
        value: "Switch Equips",
      },
    },
    switchconf: {
      contents: {
        kind: "markdown",
        value:
          "Switch configuration file.  filename switches configuration file to filename",
      },
    },
    take: {
      contents: {
        kind: "markdown",
        value:
          "Take an item from the ground.  item # take an item from the ground  first take the first item on the ground",
      },
    },
    talk: {
      contents: {
        kind: "markdown",
        value:
          "Manually talk to an NPC.  NPC # talk to an NPC  cont continue talking to NPC  resp lists response options to NPC  resp response # select a response to NPC  num number send a number to NPC  text string send text to NPC  no ends/cancels conversation with NPC",
      },
    },
    talknpc: {
      contents: {
        kind: "markdown",
        value:
          "Send a sequence of responses to an NPC.  x y NPC talk codes talk to the NPC standing at x y and use NPC talk codes",
      },
    },
    tank: {
      contents: {
        kind: "markdown",
        value:
          "Tank for a player.  player name|player # starts tank mode with player as tankModeTarget  stop stops tank mode",
      },
    },
    tele: {
      contents: {
        kind: "markdown",
        value: "Teleport to a random location.",
      },
    },
    testshop: {
      contents: {
        kind: "markdown",
        value: "Show what your vending shop would sell.",
      },
    },
    timeout: {
      contents: {
        kind: "markdown",
        value:
          "Set a timeout.  type displays value of type  type second sets value of type to seconds",
      },
    },
    top10: {
      contents: {
        kind: "markdown",
        value:
          "Displays top10 ranking.  top10 (a | alche | alchemist) displays Alchemists top10 ranking  top10 (b | black | blacksmith) displays Blackmiths top10 ranking  top10 (p | pk | pvp) displays PVP top10 ranking  top10 (t | tk | taekwon) displays Taekwons top10 ranking",
      },
    },
    uneq: {
      contents: {
        kind: "markdown",
        value: "Unequp an item.  inventory item # unequips the specified item",
      },
    },
    uneqsw: {
      contents: {
        kind: "markdown",
        value:
          "Unequp an switch item.  inventory item # unequips the specified item",
      },
    },
    vender: {
      contents: {
        kind: "markdown",
        value:
          "Buy items from vending shops.  vender # enter vender shop  vender # vender_item # [amount] buy items from vender shop  end leave current vender shop",
      },
    },
    version: {
      contents: {
        kind: "markdown",
        value: "Display the version of openkore.",
      },
    },
    vl: {
      contents: {
        kind: "markdown",
        value: "List nearby vending shops.",
      },
    },
    vs: {
      contents: {
        kind: "markdown",
        value: "Display the status of your vending shop.",
      },
    },
    warp: {
      contents: {
        kind: "markdown",
        value:
          "Open warp portal.  list lists available warp portals to open  warp portal #|map name opens a warp portal to a map",
      },
    },
    weight: {
      contents: {
        kind: "markdown",
        value:
          "Gives a report about your inventory weight.   displays info about current weight  item weight calculates how much more items of specified weight can be carried",
      },
    },
    west: {
      contents: {
        kind: "markdown",
        value: "Move 5 steps west.",
      },
    },
    where: {
      contents: {
        kind: "markdown",
        value: "Shows your current location.",
      },
    },
    who: {
      contents: {
        kind: "markdown",
        value: "Display the number of people on the current server.",
      },
    },
    whoami: {
      contents: {
        kind: "markdown",
        value: "Display your character and account ID.",
      },
    },
  };

  return hoverDocs[word] || null;
});

function getWordAtPosition(text, position) {
  const lines = text.split(/\r?\n/);
  const line = lines[position.line];
  const regex = /[\w&$@]+/g;
  let match;
  while ((match = regex.exec(line))) {
    const start = match.index;
    const end = start + match[0].length;
    if (position.character >= start && position.character <= end) {
      return match[0];
    }
  }
  return null;
}

documents.listen(connection);
connection.listen();
