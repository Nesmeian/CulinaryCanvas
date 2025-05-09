// type ConditionalJoinOptions = {
//     separator?: string;
//     allowNull?: boolean;
// };
// export const conditionalJoin = <T extends any[]>(
//     arr: T,
//     key: string,
//     options: ConditionalJoinOptions = { separator: '', allowNull: false },
// ): Partial<Record<string, string>> => {
//     if (options.allowNull && arr == null) return {};
//     if (!arr?.length) return {};
//     return { [key]: arr.join(options.separator) };
// };
