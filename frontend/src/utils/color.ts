const NUM_TAG_COLORS = 6;

export const getTagColorClass = (tagId: number): string => {
    const colorIndex = (tagId % NUM_TAG_COLORS) + 1;
    return `tag-color-${colorIndex}`;
};