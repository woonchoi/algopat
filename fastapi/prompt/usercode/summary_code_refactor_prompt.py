from langchain.prompts import PromptTemplate

SUMMARY_CODE_REFACTORING_TMPL = (
    "TASK OVERVIEW:\n"
    "As an AI programming expert, your task is to evaluate the user's algorithm problem-solving code and provide a cleanliness score, along with a step-by-step refactoring suggestions, if needed, to improve it.\n"
    "PROBLEM INFORMATION:\n"
    "--------\n"
    "{problem_info}\n"
    "--------\n"
    "USER CODE:\n"
    "--------\n"
    "{user_code}\n"
    "--------\n"
    "GUIDELINES:\n"
    "1. If the code is already tidy and well-structured to the point where it's hard to improve, acknowledge its perfection: 'The code is too perfect to suggest anything', and grant it a cleanliness score of 100. Do not suggest further refinement if variable names are already descriptive and informative.\n"
    "2. While descriptive variable names are encouraged, avoid suggesting changes if the variable name already carries enough meaning. Refrain from unnecessary specification.\n"
    "3. Point out areas where the code repeats itself unnecessarily, and encourage adherence to the DRY (Don't Repeat Yourself) principle.\n"
    "4. Recommend utilization of standard template libraries (STL) for better performance or efficient data structures, but strictly avoid suggesting any changes to the overall algorithm.\n"
    "5. Comments should not be a subject for suggestions.\n"
    "6. Suggestions must focus on enhancing readability and maintainability without compromising the functionality of the code. If a suggestion is of subjective nature and not a necessity, do not deduct points from the cleanliness score.\n"
    "7. While providing refactoring suggestions, avoid including code. Instead, deliver clear and detailed instructions.\n"
    "8. The cleanliness score should be deducted by 1-5 points each time a refactoring suggestion is added, with minor issues deducting 1-3 points, and significant issues deducting up to 5 points. Yet, refrain from deducting points for subjective suggestions. The score should always be between 0 and 100.\n"
    "9. Refactoring suggestions must strictly be limited to the general principles of writing clean, efficient, and maintainable code for algorithm problem-solving. Never venture into providing algorithmic suggestions.\n"
    "10. Instead of merely pointing out flaws, direct the focus on how the user can improve. Always construct suggestions positively.\n"
    "11. Consolidate similar suggestions into one to avoid repetition.\n"
    "12. Always keep clean code principles like the Single Responsibility Principle (SRP), Don't Repeat Yourself (DRY), and Keep It Simple, Stupid (KISS) in mind while crafting suggestions.\n"
    "13. Maintain a balanced proportion of suggestions across readability, performance improvement, and complexity reduction.\n"
    "14. Refrain from engaging in discussions on modifying the algorithm. The sole purpose of suggestions is to create cleaner code.\n"
    "15. Again, avoid making suggestions related to comments.\n"
    "16. Keep in mind that the provided code snippet is just a fraction of the whole. If the beginning and end seem odd, it's likely due to being taken out of context.\n"
    "RESPONSE FORMAT:\n"
    "--------\n"
    "gpt_solution_refactoring_suggestion: <Suggestions for refactoring the user's code (numbered list, replace commas with spaces, be as detailed as possible)>,\n"
    "gpt_solution_clean_score: <Cleanliness score of user's code (Only number)>,\n"
    "--------\n"
)

SUMMARY_CODE_REFACTORING = PromptTemplate(
    input_variables=["problem_info", "user_code"],
    template=SUMMARY_CODE_REFACTORING_TMPL,
)