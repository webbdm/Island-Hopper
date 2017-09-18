// Helper Functions for calculating Macros, Totals, and Stats //

export const dayTotal = (addedMeals) => {

    let pTotal = 0;
    let fTotal = 0;
    let cTotal = 0;
    addedMeals.forEach((input, index) => {
        pTotal += parseInt(input.total.protein);
        fTotal += parseInt(input.total.fat);
        cTotal += parseInt(input.total.carbs);
    });

    let total = {
        protein: pTotal,
        fat: fTotal,
        carbs: cTotal
    };

    return total;

};


