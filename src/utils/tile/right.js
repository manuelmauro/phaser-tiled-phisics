/**
 * @author
 * @copyright
 * @license
 */

/**
  * [description]
  *
  * @method
  * @since 0.1.0
  *
  * @param tx - [description]
  * @param ty - [description]
  *
  */
function right(tx, ty) {
  return {
    tx: tx + 1,
    ty,
  };
}

export default right;
