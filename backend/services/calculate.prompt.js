function getPrompt(dict_of_vars_str) {
    const text = (
        `You have been given an image with some mathematical expressions, equations, or graphical problems, and you need to solve them. ` +
        `Note: Use the PEMDAS rule for solving mathematical expressions. PEMDAS stands for the Priority Order: Parentheses, Exponents, Multiplication and Division (from left to right), Addition and Subtraction (from left to right). Parentheses have the highest priority, followed by Exponents, then Multiplication and Division, and lastly Addition and Subtraction. ` +

        `For example: ` +
        `Q. 2 + 3 * 4 ` +
        `(3 * 4) => 12, 2 + 12 = 14. ` +
        `Q. 2 + 3 + 5 * 4 - 8 / 2 ` +
        `5 * 4 => 20, 8 / 2 => 4, 2 + 3 => 5, 5 + 20 => 25, 25 - 4 => 21. ` +

        `YOU CAN HAVE FIVE TYPES OF EQUATIONS/EXPRESSIONS IN THIS IMAGE, AND ONLY ONE CASE SHALL APPLY EVERY TIME: ` +
        `Following are the cases: ` +

        `1. Simple mathematical expressions like 2 + 2, 3 * 4, 5 / 6, 7 - 8, etc.: ` +
        `In this case, solve and return the answer in the format of a JSON ARRAY WITH ONE OBJECT ` +
        `[{"expr": "given expression", "result": "calculated answer", "assign": false}]. ` +

        `2. Set of Equations like x^2 + 2x + 1 = 0, 3y + 4x = 0, 5x^2 + 6y + 7 = 12, etc.: ` +
        `In this case, solve for the given variables, and return a JSON ARRAY OF OBJECTS, ` +
        `for example: [{"expr": "x", "result": 2, "assign": true}, {"expr": "y", "result": 5, "assign": true}]. ` +
        `Include as many objects as there are variables. ` +

        `3. Assigning values to variables like x = 4, y = 5, z = 6, etc.: ` +
        `In this case, assign values to variables and return a JSON ARRAY OF OBJECTS, ` +
        `keeping the variable as "expr", the value as "result", and "assign": true. ` +

        `4. Analyzing Graphical Math problems, which are word problems represented in drawing form, such as cars colliding, ` +
        `trigonometric problems, problems on the Pythagorean theorem, adding runs from a cricket wagon wheel, etc. ` +
        `These will have a drawing representing some scenario and accompanying information with the image. ` +
        `PAY CLOSE ATTENTION TO DIFFERENT COLORS FOR THESE PROBLEMS. ` +
        `Return the answer as a JSON ARRAY WITH ONE OBJECT ` +
        `[{"expr": "given expression", "result": "calculated answer", "assign": false}]. ` +

        `5. Detecting Abstract Concepts that a drawing might show, such as love, hate, jealousy, patriotism, or a historic reference ` +
        `to war, invention, discovery, quote, etc. USE THE SAME FORMAT AS OTHERS TO RETURN THE ANSWER, ` +
        `where "expr" is the explanation of the drawing and "result" is the abstract concept. ` +

        `Analyze the equation or expression in this image and return the answer according to the given rules. ` +

        `Here is a dictionary of user-assigned variables. If the given expression contains any of these variables, ` +
        `substitute their values before evaluation and do NOT reassign them: ${dict_of_vars_str}. ` +

        `OUTPUT REQUIREMENTS: ` +
        `NEVER USE ANY BACKTICKS` +
        `RETURN ONLY VALID JSON. ` +
        `THE OUTPUT MUST BE A JSON ARRAY. ` +
        `EACH OBJECT MUST CONTAIN THE KEYS "expr", "result", AND "assign". ` +
        `IN CASE THERE ARE MULTIPLE VARIABLES, ARRAY SHOULD CONTAIN AN OBJECT FOR EACH VARIABLE` +
        `WHENEVER POSSIBLE, "expr" SHOULD BE THE VARIABLE, NOT THE ENTIRE EXPRESSION SENT IN` +
        `USE DOUBLE QUOTES FOR ALL KEYS AND STRING VALUES. ` +
        `Use true or false for booleans. ` +
        `DO NOT INCLUDE EXPLANATIONS, MARKDOWN, OR EXTRA TEXT.` +
        `DO NOT USE BACKTICKS OR MARKDOWN FORMATTING` +
        `DO NOT INCLUDE FORMATTING LIKE BACKTICKS JSON`
    );

    return text
}

module.exports = getPrompt