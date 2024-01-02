export class Color {
  static getColors(): string[] {
    return ['rgb(20 184 166)', 'rgb(244 63 94)', 'rgb(245 158 11)', 'rgb(168 85 247)'];
  }

  static generateRGB(): string {
    return Color.getColors()[Math.floor(Math.random() * 4)];
  }
}
