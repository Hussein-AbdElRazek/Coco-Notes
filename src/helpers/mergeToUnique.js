export const mergeToUnique = (array1, array2) =>
{
    const uniqueArray = new Set();

    array1.forEach(ele =>
    {
        const stringRepresentation = JSON.stringify(ele);
        uniqueArray.add(stringRepresentation);
    });
    array2.forEach(ele =>
    {
        const stringRepresentation = JSON.stringify(ele);
        uniqueArray.add(stringRepresentation);
    });

    const mergedArray = Array.from(uniqueArray).map(stringRepresentation => JSON.parse(stringRepresentation));
    return mergedArray
}