/**
 * Policy to show or hide a component based on the app user roles
 */
export default class RolePolicy {
  constructor(
    /**
     * Whether to show the component for the given roles
     */
    public showForRoles: string[] = [],

    /**
     * Whether to enable the component for the given roles
     */
    public enableForRoles: string[] = []
  ) {}

  canShow(roles: string[]): boolean {
    if (this.showForRoles.length === 0) {
      return true // If no roles are set then it can be shown for any role
    }

    // If any of the roles of the user is in the policy, then it can show
    for (let role of roles) {
      if (this.showForRoles.indexOf(role) > -1) {
        return true
      }
    }

    return false // There are roles to show but none of the user roles match them
  }

  canEnable(roles: string[]): boolean {
    if (this.enableForRoles.length === 0) {
      return true // If no roles are set then it can be enabled for any role
    }

    // If any of the roles of the user is in the policy, then it can enable
    for (let role of roles) {
      if (this.enableForRoles.indexOf(role) > -1) {
        return true
      }
    }

    return false // There are roles to enable but none of the user roles match them
  }
}
