// Re-export from text-formatting-utils for backwards compatibility
export { 
  processTextWithLinks, 
  formatTextWithCode, 
  processConfigurationText 
} from "./text-formatting-utils"

/**
 * Generate Nielsen Norman Group URL with anchor for UI terms
 */
export function getNielsenNormanGroupUrl(termId: string): string {
  // Map term IDs to Nielsen Norman Group anchor format
  const anchorMap: Record<string, string> = {
    // Controls
    button: "Button",
    checkbox: "Checkbox",
    "radio-button": "Radio-Button",
    slider: "Slider",
    toggle: "Toggle",
    textbox: "Textbox",
    "dropdown-list": "Dropdown-List",
    "combo-box": "Combo-Box",
    "date-picker": "Date-Picker",
    "calendar-picker": "Calendar-Picker",
    "wheel-style-date-picker": "Wheel-Style-Date-Picker",
    "wheel-picker": "Wheel-Picker",
    picker: "Picker",
    "input-control": "Input-Control",
    "input-stepper": "Input-Stepper",
    "range-control": "Range-Control",
    knob: "Knob",
    scrollbar: "Scrollbar",
    "floating-button": "Floating-Button",
    "back-to-top-button": "Back-to-Top-Button",
    "split-button": "Split-Button",
    "segmented-button": "Segmented-Button",
    "state-switch-control": "State-Switch-Control",
    control: "Control",
    "2d-matrix": "2D-Matrix",
    listbox: "Listbox",

    // Navigation
    link: "Link",
    "anchor-link": "Anchor",
    menu: "Menu",
    "dropdown-menu": "Dropdown-Menu",
    "contextual-menu": "Contextual-Menu",
    "navigation-menu": "Navigation-Menu",
    "drawer-menu": "Drawer-Menu",
    "expandable-menu": "Expandable-Menu",
    megamenu: "Megamenu",
    "pie-menu": "Pie-Menu",
    submenu: "Submenu",
    "menu-bar": "Menu-Bar",
    "navigation-bar": "Navigation-Bar",
    breadcrumbs: "Breadcrumbs",
    "tab-bar": "Tab-Bar",
    ribbon: "Ribbon",

    // Layout
    card: "Card",
    accordion: "Accordion",
    carousel: "Carousel",
    container: "Container",
    list: "List",

    // Indicators
    badge: "Badge",
    notification: "Notification",
    "progress-bar": "Progress-Bar",
    "progress-indicator": "Progress-Indicator",
    spinner: "Spinner",
    "skeleton-screen": "Skeleton-Screen",
    snackbar: "Toast",
    alert: "Alert",
    toast: "Toast",

    // Overlays
    overlay: "Overlay",
    dialog: "Dialog",
    tooltip: "Tooltip",
    popup: "Popup",
    "popup-tip": "Popup-Tip",
    lightbox: "Lightbox",
    "bottom-sheet": "Bottom-Sheet",
    "side-sheet": "Side-Sheet",

    // Visual Elements
    icon: "Icon",
  }

  // Use mapped anchor or fallback to title case conversion
  const anchor =
    anchorMap[termId] ||
    termId
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("-")

  return `https://www.nngroup.com/articles/ui-elements-glossary/#${anchor}`
}

