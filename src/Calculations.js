// Helper Functions for calculating Macros, Totals, and Stats //


// Add up the totals of every meal in your day
export const dayTotal = (addedMeals) => {

    let pTotal = 0;
    let fTotal = 0;
    let cTotal = 0;
    addedMeals.forEach((input, index) => {
        pTotal += parseInt(input.total.protein, 10);
        fTotal += parseInt(input.total.fat, 10);
        cTotal += parseInt(input.total.carbs, 10);
    });

    let total = {
        protein: pTotal,
        fat: fTotal,
        carbs: cTotal
    };

    return total;

};


