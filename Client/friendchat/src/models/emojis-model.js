import { action, thunk, computed } from "easy-peasy";

const emojisModel = {
  emojis: [
    { id: 1, content: "😀", type: "emoji" },
    { id: 2, content: "😄", type: "emoji" },
    { id: 3, content: "😆", type: "emoji" },
    { id: 4, content: "🤣", type: "emoji" },
    { id: 5, content: "😂", type: "emoji" },
    { id: 6, content: "😅", type: "emoji" },
    { id: 7, content: "🙂", type: "emoji" },
    { id: 8, content: "😉", type: "emoji" },
    { id: 9, content: "😊", type: "emoji" },
    { id: 10, content: "😇", type: "emoji" },
    { id: 11, content: "🥰", type: "emoji" },
    { id: 12, content: "😍", type: "emoji" },
    { id: 13, content: "🤩", type: "emoji" },
    { id: 14, content: "😘", type: "emoji" },
    { id: 15, content: "😗", type: "emoji" },
    { id: 16, content: "😚", type: "emoji" },
    { id: 17, content: "🥲", type: "emoji" },
    { id: 18, content: "😏", type: "emoji" },
    { id: 19, content: "😋", type: "emoji" },
    { id: 20, content: "😛", type: "emoji" },
    { id: 21, content: "😁", type: "emoji" },
    { id: 22, content: "😜", type: "emoji" },
    { id: 23, content: "🤪", type: "emoji" },
    { id: 24, content: "😝", type: "emoji" },
    { id: 25, content: "🤗", type: "emoji" },
    { id: 26, content: "🤭", type: "emoji" },
    { id: 27, content: "🫣", type: "emoji" },
    { id: 28, content: "🤐", type: "emoji" },
    { id: 29, content: "🤔", type: "emoji" },
    { id: 30, content: "🫡", type: "emoji" },
    { id: 31, content: "🤤", type: "emoji" },
    { id: 32, content: "🥳", type: "emoji" },
    { id: 33, content: "🥸", type: "emoji" },
    { id: 34, content: "😎", type: "emoji" },
    { id: 35, content: "🤓", type: "emoji" },
    { id: 36, content: "🧐", type: "emoji" },
    { id: 37, content: "🙃", type: "emoji" },
    { id: 38, content: "🫠", type: "emoji" },
    { id: 39, content: "🤨", type: "emoji" },
    { id: 40, content: "😑", type: "emoji" },
    { id: 41, content: "😔", type: "emoji" },
    { id: 42, content: "😪", type: "emoji" },
    { id: 43, content: "😴", type: "emoji" },
    { id: 44, content: "😷", type: "emoji" },
    { id: 45, content: "🤒", type: "emoji" },
    { id: 46, content: "🤢", type: "emoji" },
    { id: 47, content: "🤮", type: "emoji" },
    { id: 48, content: "🤕", type: "emoji" },
    { id: 49, content: "🥵", type: "emoji" },
    { id: 50, content: "🥶", type: "emoji" },
    { id: 51, content: "😵‍💫", type: "emoji" },
    { id: 52, content: "🤯", type: "emoji" },
    { id: 53, content: "🥱", type: "emoji" },
    { id: 54, content: "😕", type: "emoji" },
    { id: 55, content: "😮", type: "emoji" },
    { id: 56, content: "🥺", type: "emoji" },
    { id: 57, content: "😧", type: "emoji" },
    { id: 58, content: "😰", type: "emoji" },
    { id: 59, content: "😥", type: "emoji" },
    { id: 60, content: "😢", type: "emoji" },
    { id: 61, content: "😭", type: "emoji" },
    { id: 62, content: "😱", type: "emoji" },
    { id: 63, content: "😖", type: "emoji" },
    { id: 64, content: "😣", type: "emoji" },
    { id: 65, content: "😩", type: "emoji" },
    { id: 66, content: "😡", type: "emoji" },
    { id: 67, content: "👿", type: "emoji" },
    { id: 68, content: "😈", type: "emoji" },
    { id: 69, content: "🙈", type: "emoji" },
    { id: 70, content: "🙉", type: "emoji" },
    { id: 71, content: "🙊", type: "emoji" },
    { id: 72, content: "🍆", type: "emoji" },
    { id: 73, content: "🥑", type: "emoji" },
    { id: 74, content: "🍑", type: "emoji" },
    { id: 75, content: "🍒", type: "emoji" },
    { id: 76, content: "🍭", type: "emoji" },
    { id: 77, content: "🧁", type: "emoji" },
    { id: 78, content: "🎂", type: "emoji" },
    { id: 79, content: "👋", type: "emoji" },
    { id: 80, content: "🖖", type: "emoji" },
    { id: 81, content: "🫴", type: "emoji" },
    { id: 82, content: "🫳", type: "emoji" },
    { id: 83, content: "✌️", type: "emoji" },
    { id: 84, content: "🤏", type: "emoji" },
    { id: 85, content: "👀", type: "emoji" },
    { id: 86, content: "👅", type: "emoji" },
    { id: 87, content: "💦", type: "emoji" },
    { id: 88, content: "🫦", type: "emoji" },
    { id: 89, content: "🤝", type: "emoji" },
    { id: 90, content: "❤️", type: "emoji" },
    { id: 91, content: "💕", type: "emoji" },
    { id: 92, content: "💘", type: "emoji" },
    { id: 93, content: "❤️‍🩹", type: "emoji" },
    { id: 94, content: "🫶", type: "emoji" },
    { id: 95, content: "🆘", type: "emoji" },
    { id: 96, content: "⛔", type: "emoji" },
    { id: 97, content: "🐱", type: "emoji" },
    { id: 98, content: "😻", type: "emoji" },
    { id: 99, content: "😹", type: "emoji" },
    { id: 100, content: "😿", type: "emoji" },
  ],
  getEmoji: computed((state) => {
    return (id) => state.emojis[id];
  }),
};

export default emojisModel;