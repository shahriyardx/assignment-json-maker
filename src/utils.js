const getJsonDataLegacy = (jsonData) => {
  const sections = []

  for (const sectionName in jsonData) {
    const requirements = Object.values(jsonData[sectionName]).map(
      (requirement) => {
        const subreqs = []
        for (const key in requirement) {
          if (key.startsWith("sub_req_")) {
            subreqs.push({
              ...requirement[key],
              okayMessage: "okay",
              notOkayMessage: "not okay",
            })
          }
        }
        const reqData = {
          data: {
            description: requirement.description,
            number: requirement.number,
            correct: requirement.correct,
            okayMessage: "okay",
            notOkayMessage: "not okay",
          },
          subRequirements: subreqs,
        }

        return reqData
      },
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
