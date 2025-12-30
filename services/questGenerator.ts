// const OLLAMA_API = "";
// export const generateQuestsPrompt = (surveyInfo, exercises) => {
//   return `
//     Ты — фитнес-тренер FAI.
//     Твоя задача — сгенерировать **ровно 3 квеста** (тренировки) на сегодня для пользователя.
//     Данные пользователя:
//     - Пол: ${surveyInfo.gender}
//     - Возраст: ${surveyInfo.age} лет
//     - Рост: ${surveyInfo.height} см
//     - Вес: ${surveyInfo.weight} кг
//     - Цель: ${surveyInfo.goal}
//     - Уровень подготовки: ${surveyInfo.level}
//     Полная база упражнений: ${exercises}
//     Доступные упражнения ${exercises.map((exercise: any) => `$title ${exercise.title}, ExerciseCategory: ${exercise.exerciseCategory}, MuscleCategories: ${exercise.muscleCategories.map((muscleCategory: any) => muscleCategory.title + ", ")}, Description: ${exercise.description}, Technique: ${exercise.technique}`)}. Используй тольки эти, никаких других, свои ни в коем случае не придумывай!
//     Данные я хочу получать в формате JSON и больше ничего, никакой дополнительной информации, только JSON! Твоя задача лишь добавить количество подходов, количество повторений на подход и время отдыха между подходами в секундах!
//     Формат:
//     {
//         quests: [
//             {
//                 title: ,
//                 exerciseCategory: ,
//                 muscleCategories: ,
//                 description: ,
//                 technique: ,
//                 sets: ,
//                 reps: ,
//                 rest: , // (в секундах)
//             },
//             ...
//         ]
//     }
//     В квестах должна содержаться информация о самих упражнениях их той базы, что я тебе передал, ни в коем случае не бери другие упражнения!
//     Сгенерируй квесты на сегодня!
//     `;
// };

// export const askOllama = async (prompt: string) => {
//   try {
//     const response = await fetch(OLLAMA_API, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "llama3.1:8b",
//         messages: [
//           {
//             role: "user",
//             content: prompt,
//           },
//         ],
//         stream: false,
//         options: {
//           temperature: 0.7,
//           top_p: 0.9,
//         },
//       }),
//     });

//     const data = await response.json();
//     return data.message?.content?.trim() || "Нет ответа";
//   } catch (error) {
//     console.error("Ошибка Ollama:", error);
//     throw error;
//   }
// };

export const generateQuests = (surveyInfo, exercises) => {
  if (!surveyInfo || !exercises || exercises.length === 0) {
    return [];
  }

  const { goal, level } = surveyInfo;

  const levelSettings = {
    Начинающий: { sets: 3, reps: 12, rest: 90 },
    "Средний уровень": { sets: 4, reps: 10, rest: 75 },
    "Продвинутый уровень": { sets: 5, reps: 8, rest: 60 },
  };

  const goalCategories = {
    Похудеть: ["Выносливость", "Выносливость", "Сила"],
    "Наращивание мышц": ["Сила", "Сила", "Сила"],
    "Поддерживать форму": ["Сила", "Выносливость", "Гибкость"],
  };

  const neededCategories =
    goalCategories[goal] || goalCategories["Поддерживать форму"];
  const baseSettings = levelSettings[level] || levelSettings["Средний уровень"];

  const exercisesByCategory = {};
  exercises.forEach((exercise) => {
    const category = exercise.exerciseCategory?.title || "Другое";
    if (!exercisesByCategory[category]) {
      exercisesByCategory[category] = [];
    }
    exercisesByCategory[category].push(exercise);
  });

  const quests = [];
  let questId = 1;

  neededCategories.forEach((neededCategory, index) => {
    let availableExercises = exercisesByCategory[neededCategory] || [];

    if (availableExercises.length === 0) {
      availableExercises = exercises;
    }

    if (availableExercises.length > 0) {
      const exercise = availableExercises[index % availableExercises.length];

      let sets = baseSettings.sets;
      let reps = baseSettings.reps;
      let rest = baseSettings.rest;

      if (neededCategory === "Выносливость") {
        reps = Math.min(20, reps + 3);
        rest = Math.max(45, rest - 15);
      } else if (neededCategory === "Сила") {
        reps = Math.max(6, reps - 2);
        rest = rest + 15;
      } else if (neededCategory === "Гибкость") {
        sets = Math.max(2, sets - 1);
        reps = Math.min(25, reps + 5);
        rest = Math.max(30, rest - 20);
      }

      const quest = {
        id: Date.now() * 1000 + questId,
        title: exercise.title,
        exerciseCategory: exercise.exerciseCategory,
        muscleCategories: exercise.muscleCategories,
        description: exercise.description,
        technique: exercise.technique,

        sets: sets,
        reps: reps,
        rest: rest,
      };

      quests.push(quest);
      questId++;
    }
  });

  while (quests.length < 3 && exercises.length > 0) {
    const exercise = exercises[quests.length % exercises.length];
    const quest = {
      id: Date.now() * 1000 + quests.length + 100,
      title: exercise.title,
      exerciseCategory: exercise.exerciseCategory,
      muscleCategories: exercise.muscleCategories,
      description: exercise.description,
      technique: exercise.technique,
      sets: baseSettings.sets,
      reps: baseSettings.reps,
      rest: baseSettings.rest,
    };
    quests.push(quest);
  }

  return quests;
};
