import { Box, HStack } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import useMeasure from 'react-use-measure';

import { hiddenStyles, tagStyles } from '~/components/NewRecipeComponents/componentStyles';
import { addCategoryToNewRecipeProps } from '~/types/NewRecipesTypes';

export const AddCategory = ({ selectCategory, width }: addCategoryToNewRecipeProps) => {
    const [itemWidths, setItemWidths] = useState<Record<string, number>>({});
    const handleResize = useCallback((key: string, w: number) => {
        setItemWidths((prev) =>
            prev[key] === w
                ? prev
                : {
                      ...prev,
                      [key]: w,
                  },
        );
    }, []);

    let accumulated = 0;
    let fitCount = 0;
    for (const key of selectCategory) {
        const w = itemWidths[key] || 0;
        if (accumulated + w <= width) {
            accumulated += w;
            fitCount++;
        } else {
            break;
        }
    }
    const hiddenCount = selectCategory.length - fitCount;

    return (
        <>
            <Box sx={hiddenStyles}>
                {selectCategory.map((key) => (
                    <MeasuredItem key={key} label={key} onResize={handleResize} />
                ))}
            </Box>

            <HStack spacing={2}>
                {selectCategory.slice(0, fitCount).map((key) => (
                    <Box key={key} {...tagStyles}>
                        {key}
                    </Box>
                ))}

                {hiddenCount > 0 && <Box {...tagStyles}>+{hiddenCount}</Box>}
            </HStack>
        </>
    );
};

const MeasuredItem = ({
    label,
    onResize,
}: {
    label: string;
    onResize: (key: string, w: number) => void;
}) => {
    const [ref, bounds] = useMeasure();

    useEffect(() => {
        if (bounds.width) {
            onResize(label, bounds.width);
        }
    }, [bounds.width, label, onResize]);

    return (
        <Box ref={ref} {...hiddenStyles}>
            {label}
        </Box>
    );
};
