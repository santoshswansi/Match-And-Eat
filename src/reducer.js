export function reducer(state, action){
  return {
    ...state,
    ...action 
  }
}

// Initial state of the reducer hook
export const initialState = {
  "top-top-right": {
    occupant: null,
    isHovering: false,
    tripletMembers: [
      ["top-top-middle", "top-top-left"],
      ["top-right-middle", "top-bottom-right"],
    ],
    neighbor: ["top-top-middle", "top-right-middle"],
  },
  "top-top-middle": {
    occupant: null,
    isHovering: false,
    tripletMembers: [
      ["top-top-left", "top-top-right"],
      ["middle-top-middle", "bottom-top-middle"],
    ],
    neighbor: ["top-top-left", "top-top-right", "middle-top-middle"],
  },
  "top-top-left": {
    occupant: null,
    isHovering: false,
    tripletMembers: [
      ["top-top-middle", "top-top-right"],
      ["top-left-middle", "top-bottom-left"],
    ],
    neighbor: ["top-top-middle", "top-left-middle"],
  },
  "top-left-middle": {
    occupant: null,
    isHovering: false,
    tripletMembers: [
      ["top-top-left", "top-bottom-left"],
      ["middle-left-middle", "bottom-left-middle"],
    ],
    neighbor: ["top-top-left", "top-bottom-left", "middle-left-middle"],
  },
  "top-bottom-left": {
    occupant: null,
    isHovering: false,
    tripletMembers: [
      ["top-top-left", "top-left-middle"],
      ["top-bottom-middle", "top-bottom-right"],
    ],
    neighbor: ["top-left-middle", "top-bottom-middle"],
  },
  "top-bottom-middle": {
    occupant: null,
    isHovering: false,
    tripletMembers: [
      ["top-bottom-left", "top-bottom-right"],
      ["middle-bottom-middle", "bottom-bottom-middle"],
    ],
    neighbor: ["top-bottom-left", "top-bottom-right", "middle-bottom-middle"],
  },
  "top-bottom-right": {
    occupant: null,
    isHovering: false,
    tripletMembers: [
      ["top-bottom-left", "top-bottom-middle"],
      ["top-right-middle", "top-top-right"],
    ],
    neighbor: ["top-bottom-middle", "top-right-middle"],
  },
  "top-right-middle": {
    occupant: null,
    isHovering: false,
    tripletMembers: [
      ["top-top-right", "top-bottom-right"],
      ["middle-right-middle", "bottom-right-middle"],
    ],
    neighbor: ["top-top-right", "top-bottom-right", "middle-right-middle"],
  },
  "middle-top-right": {
    occupant: null,
    isHovering: false,
    tripletMembers: [
      ["middle-top-middle", "middle-top-left"],
      ["middle-right-middle", "middle-bottom-right"],
    ],
    neighbor: ["middle-top-middle", "middle-right-middle"],
  },
  "middle-top-middle": {
    occupant: null,
    isHovering: false,
    tripletMembers: [
      ["middle-top-left", "middle-top-right"],
      ["top-top-middle", "bottom-top-middle"],
    ],
    neighbor: [
      "middle-top-left",
      "middle-top-right",
      "top-top-middle",
      "bottom-top-middle",
    ],
  },
  "middle-top-left": {
    occupant: null,
    isHovering: false,
    tripletMembers: [
      ["middle-top-middle", "middle-top-right"],
      ["middle-left-middle", "middle-bottom-left"],
    ],
    neighbor: ["middle-top-middle", "middle-left-middle"],
  },
  "middle-left-middle": {
    occupant: null,
    isHovering: false,
    tripletMembers: [
      ["middle-top-left", "middle-bottom-left"],
      ["top-left-middle", "bottom-left-middle"],
    ],
    neighbor: [
      "middle-top-left",
      "middle-bottom-left",
      "top-left-middle",
      "bottom-left-middle",
    ],
  },
  "middle-bottom-left": {
    occupant: null,
    isHovering: false,
    tripletMembers: [
      ["middle-top-left", "middle-left-middle"],
      ["middle-bottom-middle", "middle-bottom-right"],
    ],
    neighbor: ["middle-left-middle", "middle-bottom-middle"],
  },
  "middle-bottom-middle": {
    occupant: null,
    isHovering: false,
    tripletMembers: [
      ["middle-bottom-left", "middle-bottom-right"],
      ["top-bottom-middle", "bottom-bottom-middle"],
    ],
    neighbor: [
      "middle-bottom-left",
      "middle-bottom-right",
      "top-bottom-middle",
      "bottom-bottom-middle",
    ],
  },
  "middle-bottom-right": {
    occupant: null,
    isHovering: false,
    tripletMembers: [
      ["middle-bottom-left", "middle-bottom-middle"],
      ["middle-right-middle", "middle-top-right"],
    ],
    neighbor: ["middle-bottom-middle", "middle-right-middle"],
  },
  "middle-right-middle": {
    occupant: null,
    isHovering: false,
    tripletMembers: [
      ["middle-top-right", "middle-bottom-right"],
      ["top-right-middle", "bottom-right-middle"],
    ],
    neighbor: [
      "middle-top-right",
      "middle-bottom-right",
      "top-right-middle",
      "bottom-right-middle",
    ],
  },
  "bottom-top-right": {
    occupant: null,
    isHovering: false,
    tripletMembers: [
      ["bottom-top-middle", "bottom-top-left"],
      ["bottom-right-middle", "bottom-bottom-right"],
    ],
    neighbor: ["bottom-top-middle", "bottom-right-middle"],
  },
  "bottom-top-middle": {
    occupant: null,
    isHovering: false,
    tripletMembers: [
      ["bottom-top-left", "bottom-top-right"],
      ["middle-top-middle", "top-top-middle"],
    ],
    neighbor: ["bottom-top-left", "bottom-top-right", "middle-top-middle"],
  },
  "bottom-top-left": {
    occupant: null,
    isHovering: false,
    tripletMembers: [
      ["bottom-top-middle", "bottom-top-right"],
      ["bottom-left-middle", "bottom-bottom-left"],
    ],
    neighbor: ["bottom-top-middle", "bottom-left-middle"],
  },
  "bottom-left-middle": {
    occupant: null,
    isHovering: false,
    tripletMembers: [
      ["bottom-top-left", "bottom-bottom-left"],
      ["middle-left-middle", "top-left-middle"],
    ],
    neighbor: ["bottom-top-left", "bottom-bottom-left", "middle-left-middle"],
  },
  "bottom-bottom-left": {
    occupant: null,
    isHovering: false,
    tripletMembers: [
      ["bottom-top-left", "bottom-left-middle"],
      ["bottom-bottom-middle", "bottom-bottom-right"],
    ],
    neighbor: ["bottom-left-middle", "bottom-bottom-middle"],
  },
  "bottom-bottom-middle": {
    occupant: null,
    isHovering: false,
    tripletMembers: [
      ["bottom-bottom-left", "bottom-bottom-right"],
      ["middle-bottom-middle", "top-bottom-middle"],
    ],
    neighbor: [
      "bottom-bottom-left",
      "bottom-bottom-right",
      "middle-bottom-middle",
    ],
  },
  "bottom-bottom-right": {
    occupant: null,
    isHovering: false,
    tripletMembers: [
      ["bottom-bottom-left", "bottom-bottom-middle"],
      ["bottom-right-middle", "bottom-top-right"],
    ],
    neighbor: ["bottom-bottom-middle", "bottom-right-middle"],
  },
  "bottom-right-middle": {
    occupant: null,
    isHovering: false,
    tripletMembers: [
      ["bottom-top-right", "bottom-bottom-right"],
      ["middle-right-middle", "top-right-middle"],
    ],
    neighbor: [
      "bottom-top-right",
      "bottom-bottom-right",
      "middle-right-middle",
    ],
  },
};