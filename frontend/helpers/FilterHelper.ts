export default class FilterHelper {
  /**
   * Sorts between params A and B. Commonly used with tables.
   */
  static sort(a: any, b: any) {
    switch (typeof a) {
      case 'string':
        a = a ? a.toUpperCase() : ''
        break

      case 'number':
        a = a || 0
        break

      default:
      case 'boolean':
        a = a ? 1 : 0
        break
    }
    switch (typeof b) {
      case 'string':
        b = b ? b.toUpperCase() : ''
        break

      case 'number':
        b = b || 0
        break

      default:
      case 'boolean':
        b = b ? 1 : 0
        break
    }
    return a < b ? -1 : a > b ? 1 : 0
  }
}
