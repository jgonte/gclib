export class TemplateResult {
  /**
   * The text resulting from replacing the placeholders that match the name of the data members
   * with the value of those data members
   */
  text?: string

  /**
   * The array with the name of the data members whose names did not match the ones in the placeholders
   */
  keysNotInData: string[] = []
}

/**
 * Replaces any placeholders "{{memberName}}" with the value of the data member that matches that name
 * @param text
 * @param data
 */
export function template(text: string, data?: any): TemplateResult {
  const result = new TemplateResult()

  if (!data) {
    result.text = text

    return result // Nothing to replace in the template, return the original text
  }

  result.keysNotInData = Object.keys(data) // Assume there hasn't been a match so far

  function processMatch(match: string, offset: number, str: string) {
    match = match
      .replace('{{', '')
      .replace('}}', '')
      .trim() // Remove the {{ }} around the match

    // Remove the "non matched" data member key
    const index: number = result.keysNotInData.indexOf(match)

    if (index > -1) {
      // Not removed already

      result.keysNotInData.splice(index, 1)
    }

    return data[match]
  }

  result.text = text.replace(/\{{\S+?\}}/g, processMatch)

  return result
}
