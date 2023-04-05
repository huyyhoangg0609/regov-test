function maxProduct(nums) {
  const validate = validateInput(nums);
  if (!validate) return 0;
  let globalMaxProduct = nums[0];
  let localMaxProduct = nums[0];
  let localMinProduct = nums[0];

  for (let i = 1; i < nums.length; i++) {
    let prevLocalMaxProduct = localMaxProduct;

    localMaxProduct = Math.max(
      nums[i],
      nums[i] * localMaxProduct,
      nums[i] * localMinProduct
    );
    localMinProduct = Math.min(
      nums[i],
      nums[i] * prevLocalMaxProduct,
      nums[i] * localMinProduct
    );

    globalMaxProduct = Math.max(localMaxProduct, globalMaxProduct);
  }

  return globalMaxProduct;
}

function validateInput(inputs) {
  if (inputs.length < 1 || inputs.length > 2 * 104) return false;
  if (inputs.some((input) => input > 10) || inputs.some((input) => input < -10))
    return false;

  return true;
}
const nums = [2, 3, -2, 4];
const nums1 = [-2, 0, -1];
const nums2 = [-10, 15, 15];

console.log(maxProduct(nums2));
