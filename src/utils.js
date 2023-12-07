const getJsonDataLegacy = (jsonData) => {
  const sections = []

  for (const sectionName in jsonData) {
    const requirements = Object.values(jsonData[sectionName]).map(
      (requirement) => {
        const subreqs = []
        for (const key in requirement) {
          if (key.startsWith("sub_req_")) {
            subreqs.push(requirement[key])
          }
        }
        const reqData = {
          data: {
            description: requirement.description,
            number: requirement.number,
            correct: requirement.correct,
            message: requirement.message,
          },
          subRequirements: subreqs,
        }

        return reqData
      }
    )

    sections.push({
      name: sectionName,
      requirements,
    })
  }

  return { sections: sections }
}

export const getJsonData = (json) => {
  if (json.type == "new") {
    return json
  }

  return getJsonDataLegacy(json)
}
