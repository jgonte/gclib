import { TemplateResult, template } from '../utils/utils'

export class ParameterBuilderResult {
  constructor(
    /**
     * The url after all its placeholders have been replaced the value of the matching parameter names
     */
    public url: string = '',

    /**
     * The concatenated "&key=value" parameters whose names did not match the placeholders of the url
     */
    public params?: string
  ) {}
}

/**
 * Builds the URL replacing any placeholder with the parameters passed if they match the name of the parameter.
 * If a placeholder matching the name of a parameter is not found, then the parameters
 */
export function buildParams(url: string, params?: any): ParameterBuilderResult {
  const tpl: TemplateResult = template(url, params)

  let result: ParameterBuilderResult = new ParameterBuilderResult(tpl.text)

  if (tpl.keysNotInData.length) {
    result.params = tpl.keysNotInData.map((k: string) => `${k}=${params[k]}`).join('&')
  } else {
    result.params = undefined
  }

  return result
}
