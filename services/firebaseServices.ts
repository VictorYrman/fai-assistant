import { db } from "@/config/firebase";
import { collection, getDoc, getDocs } from "firebase/firestore";

export const getAllExerciseCategories = async () => {
  try {
    const exerciseCategoryCollection = collection(db, "ExerciseCategory");
    const querySnapshot = await getDocs(exerciseCategoryCollection);

    const exerciseCategories = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return exerciseCategories;
  } catch (error) {
    console.error(error);
  }
};

export const getAllMuscleCategories = async () => {
  try {
    const muscleCategoryCollection = collection(db, "MuscleCategory");
    const querySnapshot = await getDocs(muscleCategoryCollection);

    const muscleCategories = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return muscleCategories;
  } catch (error) {
    console.error(error);
  }
};

export const getAllExercises = async () => {
  try {
    const exerciseCollection = collection(db, "Exercise");
    const querySnapshot = await getDocs(exerciseCollection);

    const exercises = [];

    for (const doc of querySnapshot.docs) {
      const exerciseData = {
        id: doc.id,
        exerciseCategory: doc.data().exerciseCategory,
        muscleCategories: doc.data().muscleCategories,
        description: doc.data().description,
        technique: doc.data().technique,
        ...doc.data(),
      };

      if (
        exerciseData.muscleCategories &&
        Array.isArray(exerciseData.muscleCategories)
      ) {
        const resolvedMuscleCategories = [];

        for (const ref of exerciseData.muscleCategories) {
          if (ref && ref.path) {
            try {
              const muscleDoc: any = await getDoc(ref);

              if (muscleDoc.exists()) {
                resolvedMuscleCategories.push({
                  id: muscleDoc.id,
                  title: muscleDoc.data().title,
                  description: muscleDoc.data().description,
                  ...muscleDoc.data(),
                });
              }
            } catch (error) {
              console.error(error);
              resolvedMuscleCategories.push(null);
            }
          }
        }

        exerciseData.muscleCategories = resolvedMuscleCategories;
      }

      if (exerciseData.exerciseCategory) {
        try {
          const categoryDoc: any = await getDoc(exerciseData.exerciseCategory);
          
          if (categoryDoc.exists()) {
            exerciseData.exerciseCategory = {
              id: categoryDoc.id,
              ...categoryDoc.data(),
            };
          }
        } catch (error) {
          console.error(error);
        }
      }

      exercises.push(exerciseData);
    }

    return exercises;
  } catch (error) {
    console.error(error);
  }
};
