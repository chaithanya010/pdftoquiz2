def generate_questions(text: str) -> list:
    """
    Dummy LLM service that returns predefined questions.
    In the future, this will integrate with an actual LLM.
    """
    return [
        {
            "question": "What is the capital of France?",
            "correct_answer": "Paris",
            "options": ["London", "Paris", "Berlin", "Madrid"]
        },
        {
            "question": "What is 2 + 2?",
            "correct_answer": "4",
            "options": ["3", "4", "5", "6"]
        }
    ] 