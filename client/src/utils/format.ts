export const userCourses = (dbObject: any) => {
  const {
    course_category,
    course_id,
    course_name,
    course_rate,
    instructor_id,
    instructor_name,
  } = dbObject;

  return {
    id: course_id,
    name: course_name,
    category: course_category,
    rate: course_rate,
    instructorId: instructor_id,
    instructorName: instructor_name,
  };
};

export default {
  userCourses,
};
