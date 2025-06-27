exports.studentPayload = (fields) => {
    return {
      name: fields.name.join(""),
      email: fields.email.join(""),
      phone: fields.phone.join(""),
      address: fields.address.join(""),
      age: fields.age.join(""),
      gender: fields.gender.join(""),
      institution: fields.institution.join(""),
      course: fields.course.join(""),
      year: fields.year.join(""),
      performanceScore: fields.performanceScore.join(""),
      support: fields.support[0],
      challange: fields.challange.join(""),
      goal: fields.goal.join(""),
      communicationMode: fields.communicationMode.join(""),
    }
}