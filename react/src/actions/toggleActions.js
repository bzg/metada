export function toggle(value) {
    return {
        type: 'TOGGLE_' + value.toUpperCase()
    }
}

export function toggleSearchBar() {
    return {
        type: 'TOGGLE_SEARCH'
    };
}

export function toggleChips() {
    return {
        type: 'TOGGLE_CHIPS'
    };
}

export function toggleStats() {
    return {
        type: 'TOGGLE_STATS'
    };
}

export function toggleHowItWorks() {
    return {
        type: 'TOGGLE_HOWITWORKS'
    };
}

export function toggleAbout() {
    return {
        type: 'TOGGLE_ABOUT'
    };
}

export function toggleContact() {
    return {
        type: 'TOGGLE_CONTACT'
    };
}

export function toggleSettings() {
    return {
        type: 'TOGGLE_SETTINGS'
    };
}

export function toggleExtension() {
    return {
        type: 'TOGGLE_EXTENSION'
    };
}

export function toggleSideButtons() {
    return {
        type: 'TOGGLE_SIDEBUTTONS'
    };
}

export function toggleLegend() {
    return {
        type: 'TOGGLE_LEGEND'
    };
}

export function toggleIssue() {
    return {
        type: 'TOGGLE_ISSUE'
    };
}

export function stopHelp() {
    return {
        type: 'STOP_HELP'
    };
}

export function startHelp() {
    return {
        type: 'START_HELP'
    };
}

export function toggleDrawer() {
    return {
        type: 'TOGGLE_DRAWER'
    };
}

export function toggleDoubleClickHelp() {
    return {
        type: 'TOGGLE_DOUBLE_CLICK_HELP'
    };
}
export function toggleLongClickHelp() {
    return {
        type: 'TOGGLE_LONG_CLICK_HELP'
    };
}

export function toggleFocusSearchBar() {
    return {
        type: 'TOGGLE_FOCUSSEARCHBAR'
    };
}

export function toggleGraphButtonBlink() {
    return {
        type: 'TOGGLE_GRAPH_BUTTON_BLINK'
    };
}

export function closeAll() {
    return {
        type: 'CLOSE_ALL'
    };
}