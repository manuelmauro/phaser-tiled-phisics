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
function up(tx, ty) {
  return {
    tx,
    ty: ty - 1,
  };
}

export default up;
