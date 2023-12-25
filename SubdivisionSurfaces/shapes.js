const icosahedron = {
  triangles: [
    1, 9, 0, 0, 10, 1, 0, 7, 6, 0, 6, 10, 0, 9, 7, 4, 1, 5, 9, 1, 4, 1, 10, 5,
    3, 8, 2, 2, 11, 3, 4, 5, 2, 2, 8, 4, 5, 11, 2, 6, 7, 3, 3, 11, 6, 3, 7, 8,
    4, 8, 9, 5, 10, 11, 6, 11, 10, 7, 9, 8,
  ],
  vertices: [
    0.8506510257720947, 0.0, -0.5257310271263123, 0.8506510257720947, -0.0,
    0.5257310271263123, -0.8506510257720947, -0.0, 0.5257310271263123,
    -0.8506510257720947, 0.0, -0.5257310271263123, 0.0, -0.5257310271263123,
    0.8506510257720947, 0.0, 0.5257310271263123, 0.8506510257720947, 0.0,
    0.5257310271263123, -0.8506510257720947, 0.0, -0.5257310271263123,
    -0.8506510257720947, -0.5257310271263123, -0.8506510257720947, -0.0,
    0.5257310271263123, -0.8506510257720947, -0.0, 0.5257310271263123,
    0.8506510257720947, 0.0, -0.5257310271263123, 0.8506510257720947, 0.0,
  ],
};

const chaikin0 = {
  triangles: [
    0, 1, 2, 2, 1, 3, 2, 3, 4, 4, 3, 5, 4, 5, 6, 6, 5, 7, 6, 7, 8, 8, 7, 9, 8,
    9, 10, 10, 9, 11, 10, 11, 12, 12, 11, 13, 12, 13, 14, 14, 13, 15, 14, 15,
    16, 16, 15, 17, 16, 17, 18, 18, 17, 19, 18, 19, 20, 20, 19, 21, 20, 21, 22,
    22, 21, 23, 22, 23, 0, 0, 23, 1, 1, 23, 3, 3, 23, 21, 3, 21, 5, 5, 21, 19,
    5, 19, 7, 7, 19, 17, 7, 17, 9, 9, 17, 15, 9, 15, 11, 11, 15, 13, 22, 0, 20,
    20, 0, 2, 20, 2, 18, 18, 2, 4, 18, 4, 16, 16, 4, 6, 16, 6, 14, 14, 6, 8, 14,
    8, 12, 12, 8, 10,
  ],
  vertices: [
    1.5, -0.5, 0.5, 1.5, 0.5, 0.5, 0.8999999761581421, -0.5, 0.5,
    0.8999999761581421, 0.5, 0.5, 0.30000001192092896, -0.5, 0.5,
    0.30000001192092896, 0.5, 0.5, -0.30000001192092896, -0.5, 0.5,
    -0.30000001192092896, 0.5, 0.5, -0.8999999761581421, -0.5, 0.5,
    -0.8999999761581421, 0.5, 0.5, -1.5, -0.5, 0.5, -1.5, 0.5, 0.5, -1.5, -0.5,
    -0.5, -1.5, 0.5, -0.5, -0.8999999761581421, -0.5, -0.5, -0.8999999761581421,
    0.5, -0.5, -0.30000001192092896, -0.5, -0.5, -0.30000001192092896, 0.5,
    -0.5, 0.30000001192092896, -0.5, -0.5, 0.30000001192092896, 0.5, -0.5,
    0.8999999761581421, -0.5, -0.5, 0.8999999761581421, 0.5, -0.5, 1.5, -0.5,
    -0.5, 1.5, 0.5, -0.5,
  ],
};

const cube_asymmetric = {
  triangles: [
    0, 1, 2, 2, 1, 3, 2, 3, 4, 4, 3, 5, 4, 5, 6, 6, 5, 7, 6, 7, 0, 0, 7, 1, 1,
    7, 3, 3, 7, 5, 6, 0, 4, 4, 0, 2,
  ],
  vertices: [
    0.0, 1.414214015007019, 1.0, -1.414214015007019, 0.0, 1.0,
    1.414214015007019, -0.0, 1.0, -0.0, -1.414214015007019, 1.0,
    1.414214015007019, -0.0, -1.0, -0.0, -1.414214015007019, -1.0, 0.0,
    1.414214015007019, -1.0, -1.414214015007019, 0.0, -1.0,
  ],
};

const cube = {
  triangles: [
    8, 0, 1, 8, 1, 3, 8, 3, 2, 8, 2, 0, 9, 2, 3, 9, 3, 5, 9, 5, 4, 9, 4, 2, 10,
    4, 5, 10, 5, 7, 10, 7, 6, 10, 6, 4, 11, 6, 7, 11, 7, 1, 11, 1, 0, 11, 0, 6,
    12, 1, 7, 12, 7, 5, 12, 5, 3, 12, 3, 1, 13, 6, 0, 13, 0, 2, 13, 2, 4, 13, 4,
    6,
  ],
  vertices: [
    1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0,
    -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 0.0, 0.0, 1.0, -1.0,
    0.0, 0.0, 0.0, 0.0, -1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0,
  ],
};

const tetrahedron = {
  triangles: [0, 1, 2, 0, 2, 3, 0, 3, 1, 3, 2, 1],
  vertices: [
    -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, -1.0, 1.0, -1.0,
  ],
};

const toroidal_tet = {
  triangles: [
    0, 20, 5, 20, 4, 5, 20, 2, 4, 2, 21, 4, 21, 6, 4, 21, 1, 6, 1, 22, 6, 22, 5,
    6, 22, 0, 5, 1, 23, 8, 23, 9, 8, 23, 3, 9, 3, 24, 9, 24, 7, 9, 24, 0, 7, 0,
    22, 7, 22, 8, 7, 22, 1, 8, 2, 25, 11, 25, 12, 11, 25, 3, 12, 3, 23, 12, 23,
    10, 12, 23, 1, 10, 1, 21, 10, 21, 11, 10, 21, 2, 11, 3, 25, 15, 25, 13, 15,
    25, 2, 13, 2, 20, 13, 20, 14, 13, 20, 0, 14, 0, 24, 14, 24, 15, 14, 24, 3,
    15, 5, 4, 26, 4, 18, 26, 5, 26, 16, 4, 6, 27, 6, 17, 27, 4, 27, 18, 6, 5,
    28, 5, 16, 28, 6, 28, 17, 8, 9, 29, 9, 19, 29, 8, 29, 17, 9, 7, 30, 7, 16,
    30, 9, 30, 19, 7, 8, 28, 8, 17, 28, 7, 28, 16, 11, 12, 31, 12, 19, 31, 11,
    31, 18, 12, 10, 29, 10, 17, 29, 12, 29, 19, 10, 11, 27, 11, 18, 27, 10, 27,
    17, 13, 14, 26, 14, 16, 26, 13, 26, 18, 14, 15, 30, 15, 19, 30, 14, 30, 16,
    15, 13, 31, 13, 18, 31, 15, 31, 19,
  ],
  vertices: [
    -1.0, 1.0, -1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0,
    0.20000000298023224, -0.6000000238418579, -0.6000000238418579,
    -0.6000000238418579, 0.20000000298023224, -0.6000000238418579,
    -0.6000000238418579, -0.6000000238418579, 0.20000000298023224,
    -0.6000000238418579, 0.6000000238418579, -0.20000000298023224,
    -0.6000000238418579, -0.20000000298023224, 0.6000000238418579,
    0.20000000298023224, 0.6000000238418579, 0.6000000238418579,
    -0.20000000298023224, -0.6000000238418579, 0.6000000238418579,
    0.6000000238418579, -0.6000000238418579, -0.20000000298023224,
    0.6000000238418579, 0.20000000298023224, 0.6000000238418579,
    0.6000000238418579, -0.20000000298023224, -0.6000000238418579,
    -0.20000000298023224, 0.6000000238418579, -0.6000000238418579,
    0.6000000238418579, 0.6000000238418579, 0.20000000298023224,
    -0.4000000059604645, 0.4000000059604645, -0.4000000059604645,
    -0.4000000059604645, -0.4000000059604645, 0.4000000059604645,
    0.4000000059604645, -0.4000000059604645, -0.4000000059604645,
    0.4000000059604645, 0.4000000059604645, 0.4000000059604645, 0.0, 0.0, -1.0,
    0.0, -1.0, 0.0, -1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, -0.4000000059604645, 0.0, -0.4000000059604645, 0.0,
    -0.4000000059604645, 0.0, 0.0, 0.0, 0.0, 0.4000000059604645, 0.0,
    0.4000000059604645, 0.0, 0.4000000059604645, 0.0, 0.0,
  ],
};


// https://github.com/icemiliang/loop_subdivision/blob/master/data/bunny.obj
const bunny = {
  triangles: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 10, 24, 27, 28, 29, 30, 31, 32, 33, 31, 33, 34, 28,
    15, 35, 36, 37, 38, 11, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
    52, 53, 54, 14, 55, 56, 21, 57, 58, 59, 60, 3, 61, 62, 63, 64, 10, 9, 24,
    18, 41, 65, 60, 15, 28, 66, 67, 68, 69, 70, 71, 72, 73, 74, 49, 65, 75, 76,
    77, 78, 53, 79, 80, 81, 1, 82, 83, 84, 85, 86, 87, 57, 73, 88, 74, 76, 89,
    90, 42, 91, 92, 62, 89, 93, 40, 9, 11, 94, 95, 96, 97, 98, 93, 25, 99, 100,
    101, 102, 103, 101, 103, 104, 105, 51, 106, 17, 27, 35, 107, 54, 108, 109,
    110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 88, 66, 77, 76,
    122, 4, 123, 106, 19, 18, 49, 124, 125, 126, 127, 23, 128, 129, 25, 130,
    131, 132, 116, 133, 134, 135, 136, 137, 138, 75, 47, 49, 139, 111, 110, 140,
    141, 32, 74, 142, 143, 124, 137, 125, 144, 145, 146, 147, 134, 133, 4, 106,
    38, 53, 80, 83, 148, 149, 125, 150, 151, 152, 153, 26, 149, 34, 108, 85,
    154, 155, 156, 157, 158, 159, 96, 160, 94, 161, 162, 163, 164, 165, 1, 166,
    167, 154, 24, 130, 25, 144, 168, 145, 5, 169, 95, 170, 171, 172, 173, 5,
    174, 175, 176, 177, 56, 101, 104, 82, 0, 178, 63, 179, 145, 53, 85, 54, 180,
    144, 146, 180, 146, 102, 113, 143, 142, 47, 181, 172, 8, 182, 6, 172, 48,
    47, 132, 183, 117, 184, 112, 164, 172, 171, 48, 157, 161, 182, 71, 8, 7, 90,
    62, 185, 145, 168, 64, 68, 186, 187, 84, 129, 130, 57, 59, 86, 97, 188, 189,
    80, 190, 83, 191, 177, 179, 30, 192, 105, 193, 115, 117, 194, 195, 109, 196,
    197, 176, 69, 198, 92, 199, 200, 201, 93, 89, 76, 93, 76, 202, 112, 184,
    143, 114, 113, 203, 55, 204, 102, 205, 18, 158, 21, 127, 170, 206, 207, 208,
    193, 72, 184, 27, 209, 210, 75, 211, 47, 126, 155, 167, 82, 1, 0, 79, 23,
    22, 199, 135, 58, 212, 194, 118, 68, 121, 66, 55, 213, 204, 31, 130, 32,
    214, 209, 118, 118, 194, 214, 8, 215, 205, 4, 38, 37, 11, 210, 111, 21, 23,
    127, 216, 217, 218, 219, 195, 220, 190, 80, 152, 105, 123, 30, 177, 176,
    221, 222, 223, 216, 109, 111, 210, 203, 224, 114, 197, 94, 160, 103, 95,
    104, 225, 226, 147, 5, 4, 37, 57, 87, 227, 35, 27, 24, 163, 139, 110, 222,
    174, 228, 56, 169, 22, 23, 79, 13, 132, 131, 229, 194, 212, 195, 192, 30,
    29, 154, 167, 155, 11, 10, 210, 219, 189, 78, 198, 230, 122, 231, 198, 122,
    78, 77, 230, 232, 166, 183, 233, 217, 234, 22, 152, 79, 107, 108, 20, 225,
    113, 235, 43, 42, 236, 45, 44, 237, 54, 107, 12, 94, 197, 228, 184, 72, 143,
    117, 72, 193, 53, 83, 85, 84, 99, 129, 177, 221, 179, 238, 2, 229, 200, 239,
    201, 185, 64, 168, 21, 170, 55, 211, 75, 122, 140, 130, 24, 25, 129, 99,
    222, 228, 196, 196, 223, 222, 162, 141, 39, 230, 69, 71, 34, 84, 31, 72,
    183, 154, 185, 168, 211, 240, 186, 67, 173, 241, 61, 17, 35, 15, 78, 189,
    188, 141, 242, 40, 56, 22, 21, 189, 120, 97, 175, 234, 176, 232, 164, 112,
    231, 75, 65, 17, 16, 119, 81, 82, 115, 194, 109, 214, 200, 57, 227, 48, 171,
    107, 207, 121, 208, 161, 159, 162, 157, 182, 8, 160, 145, 221, 243, 105,
    192, 216, 218, 16, 223, 217, 216, 240, 52, 51, 191, 98, 244, 153, 148, 245,
    69, 92, 70, 134, 246, 247, 52, 156, 155, 16, 218, 119, 159, 158, 33, 15, 60,
    241, 28, 153, 29, 42, 41, 91, 236, 198, 231, 219, 7, 6, 120, 119, 233, 54,
    85, 108, 166, 232, 112, 174, 222, 173, 106, 123, 105, 151, 155, 126, 2, 238,
    0, 159, 33, 32, 20, 19, 107, 93, 202, 188, 189, 219, 220, 96, 103, 146, 204,
    213, 181, 204, 181, 180, 45, 237, 187, 20, 33, 158, 241, 16, 15, 124, 167,
    248, 120, 244, 97, 175, 177, 120, 99, 83, 190, 149, 25, 100, 226, 246, 147,
    248, 246, 124, 240, 67, 156, 60, 28, 30, 111, 139, 39, 120, 220, 212, 95,
    94, 228, 137, 46, 125, 49, 18, 65, 74, 88, 207, 171, 128, 12, 125, 149, 126,
    220, 195, 212, 140, 32, 130, 27, 210, 10, 81, 184, 1, 135, 59, 58, 172, 213,
    170, 120, 189, 220, 182, 249, 6, 100, 99, 190, 139, 162, 39, 126, 149, 100,
    205, 157, 8, 134, 147, 246, 93, 63, 62, 243, 192, 45, 206, 44, 136, 179,
    221, 145, 18, 205, 41, 170, 127, 128, 178, 115, 82, 147, 133, 201, 78, 230,
    7, 122, 90, 211, 214, 109, 209, 229, 232, 132, 69, 230, 198, 199, 201, 133,
    114, 167, 112, 243, 186, 240, 70, 92, 91, 243, 51, 105, 200, 199, 58, 141,
    140, 242, 201, 239, 147, 238, 178, 0, 118, 209, 17, 223, 234, 217, 131, 238,
    229, 112, 167, 166, 174, 5, 95, 248, 167, 114, 226, 124, 246, 145, 64, 63,
    113, 142, 250, 3, 123, 4, 87, 203, 225, 165, 2, 1, 52, 150, 50, 228, 197,
    196, 153, 149, 148, 79, 53, 14, 72, 154, 73, 235, 138, 137, 55, 170, 213,
    78, 202, 76, 182, 163, 249, 143, 72, 74, 138, 206, 136, 39, 141, 40, 128,
    23, 13, 160, 96, 145, 246, 248, 247, 128, 13, 12, 223, 176, 234, 175, 120,
    233, 70, 8, 71, 133, 135, 199, 247, 135, 134, 90, 185, 211, 79, 14, 13, 75,
    231, 122, 30, 123, 60, 48, 19, 49, 22, 169, 36, 65, 43, 231, 165, 164, 232,
    195, 249, 109, 110, 109, 249, 176, 197, 221, 241, 216, 16, 108, 34, 20, 200,
    227, 239, 39, 11, 111, 135, 247, 59, 45, 187, 186, 178, 116, 115, 251, 237,
    208, 5, 61, 3, 43, 65, 41, 203, 86, 224, 86, 247, 224, 238, 131, 178, 157,
    205, 158, 155, 151, 52, 42, 198, 236, 102, 101, 55, 209, 27, 17, 96, 146,
    145, 150, 22, 36, 52, 240, 156, 34, 33, 20, 9, 140, 24, 190, 126, 100, 235,
    137, 226, 25, 149, 26, 203, 87, 86, 233, 119, 218, 70, 91, 215, 70, 215, 8,
    148, 46, 245, 68, 67, 186, 166, 154, 183, 227, 87, 225, 20, 158, 18, 165,
    229, 2, 56, 55, 101, 174, 95, 228, 36, 169, 37, 207, 250, 142, 243, 45, 186,
    170, 128, 171, 195, 6, 249, 131, 116, 178, 206, 138, 250, 151, 150, 52, 250,
    235, 113, 248, 224, 247, 159, 32, 141, 241, 173, 216, 211, 168, 181, 99, 84,
    83, 245, 46, 45, 73, 154, 156, 152, 151, 190, 216, 173, 222, 41, 205, 215,
    95, 169, 104, 73, 66, 88, 200, 58, 57, 36, 38, 50, 124, 226, 137, 159, 161,
    157, 68, 251, 121, 202, 78, 188, 35, 24, 26, 123, 3, 60, 240, 51, 243, 28,
    26, 153, 118, 120, 212, 29, 153, 192, 107, 171, 12, 98, 97, 244, 73, 156,
    66, 152, 22, 150, 47, 211, 181, 35, 26, 28, 207, 206, 250, 102, 146, 103,
    113, 112, 143, 163, 182, 161, 59, 247, 86, 136, 44, 46, 217, 233, 218, 237,
    251, 187, 9, 40, 242, 114, 224, 248, 36, 50, 150, 121, 207, 88, 181, 168,
    180, 144, 180, 168, 162, 139, 163, 234, 175, 233, 78, 7, 219, 122, 76, 90,
    191, 244, 177, 93, 98, 63, 124, 126, 167, 232, 183, 132, 61, 241, 60, 245,
    192, 153, 192, 245, 45, 210, 209, 109, 169, 5, 37, 61, 5, 173, 225, 203,
    113, 126, 190, 151, 162, 159, 141, 50, 38, 106, 93, 188, 97, 50, 106, 51,
    227, 225, 239, 117, 116, 132, 17, 119, 118, 195, 219, 6, 19, 48, 107, 208,
    237, 44, 213, 172, 181, 229, 165, 232, 164, 1, 184, 180, 102, 204, 64, 185,
    62, 81, 193, 184, 207, 142, 74, 251, 68, 187, 251, 208, 121, 197, 160, 221,
    152, 80, 79, 235, 250, 138, 43, 236, 231, 215, 91, 41, 9, 242, 140, 117,
    183, 72, 90, 89, 62, 77, 122, 230, 191, 179, 63, 191, 63, 98, 148, 125, 46,
    56, 104, 169, 110, 249, 163, 198, 42, 92, 31, 84, 130, 96, 95, 103, 156, 67,
    66, 176, 223, 196, 206, 208, 44, 71, 7, 230, 81, 115, 193, 46, 137, 136,
    225, 147, 239, 12, 14, 54, 120, 177, 244, 226, 225, 235, 85, 84, 34,
  ],
  vertices: [
    -0.823407, 0.96494, -0.734431, -0.866484, 0.939272, -0.663749, -0.777323,
    0.943719, -0.730374, -0.825354, 0.109851, -0.206608, -0.886827, 0.159992,
    -0.314411, -0.745302, 0.0894701, -0.330787, -0.16538, -0.00642253,
    -0.0348117, -0.139146, -0.0515085, -0.116644, -0.0381507, 0.120284,
    -0.104134, -0.465193, 0.365766, 0.00359484, -0.535115, 0.27314, -0.00446297,
    -0.50732, 0.272343, 0.0645657, -0.217652, 0.337304, -0.515055, -0.380378,
    0.376795, -0.521218, -0.286823, 0.391356, -0.483805, -0.645311, 0.152938,
    -0.0375182, -0.661591, 0.0357163, -0.0593744, -0.59131, 0.0410124,
    -0.0510214, 0.000221279, 0.204621, -0.302903, -0.0310185, 0.224416,
    -0.383966, -0.0139253, 0.391096, -0.29665, -0.567047, 0.229916, -0.532217,
    -0.594511, 0.328261, -0.492747, -0.515563, 0.340636, -0.548223, -0.551133,
    0.357528, -0.012899, -0.533938, 0.504225, -0.0959636, -0.636432, 0.417209,
    -0.0367423, -0.547107, 0.178697, -0.0472101, -0.698605, 0.286868,
    0.00024346, -0.771523, 0.361355, -0.0125736, -0.831307, 0.271609,
    -0.0187994, -0.181706, 0.52868, -0.098256, -0.148587, 0.434261, -0.0471147,
    -0.0730917, 0.472659, -0.143906, -0.15229, 0.566566, -0.232615, -0.601246,
    0.254793, -0.0189136, -0.743173, 0.270316, -0.483104, -0.746094, 0.169403,
    -0.438399, -0.85837, 0.237201, -0.426958, -0.366406, 0.285447, 0.0926765,
    -0.378007, 0.372339, 0.0461068, 0.0563585, 0.191358, -0.293094, 0.117592,
    0.121519, -0.268743, 0.0172348, 0.0884843, -0.37323, -0.807964, 0.535356,
    0.0527439, -0.826978, 0.451044, -0.0154539, -0.711691, 0.562533, -0.0563142,
    -0.187912, -0.00938115, -0.487465, -0.155893, 0.0705278, -0.505827,
    -0.0753725, 0.0592465, -0.40145, -0.897753, 0.352594, -0.406303, -0.950598,
    0.412697, -0.28208, -0.855949, 0.478509, -0.381318, -0.330498, 0.477815,
    -0.47396, -0.172755, 0.412363, -0.464873, -0.525137, 0.0671625, -0.501993,
    -0.571831, 0.165246, -0.447888, -0.46275, 0.987027, -0.435585, -0.408448,
    0.962203, -0.510574, -0.434505, 0.984664, -0.516126, -0.768695, 0.150732,
    -0.0702879, -0.724341, 0.0816199, -0.189018, -0.351853, -0.0448556,
    -0.407554, -0.573297, -0.0529748, -0.400467, -0.511321, -0.0664439,
    -0.465877, -0.0405652, 0.0846782, -0.366098, -0.998277, 0.602997, -0.183084,
    -0.990707, 0.500245, -0.256219, -0.992349, 0.517667, -0.12282, -0.0230147,
    0.0050742, -0.10577, 0.0146187, 0.115057, -0.10411, -0.0644684, 0.0255214,
    -0.0979705, -0.884967, 0.730698, -0.349429, -0.93912, 0.678753, -0.290556,
    -0.981233, 0.736437, -0.219845, -0.151927, -0.0244496, -0.382003, -0.293299,
    -0.0877357, -0.269603, -0.20471, -0.0709339, -0.238205, -0.228981,
    -0.0823771, -0.10421, -0.453796, 0.380954, -0.502103, -0.427653, 0.490763,
    -0.451948, -0.882226, 0.852287, -0.588353, -0.86395, 0.92197, -0.696355,
    -0.370065, 0.590229, -0.353333, -0.270163, 0.608971, -0.16591, -0.237701,
    0.587458, -0.359039, -0.489673, 0.985304, -0.45882, -0.614304, 0.899106,
    -0.326129, -0.973436, 0.654744, -0.165429, -0.320224, -0.0602487, -0.317468,
    -0.244637, -0.0795897, -0.407198, 0.0771256, 0.1715, -0.16055, 0.0874241,
    0.0645676, -0.163616, -0.374556, -0.0565179, -0.269417, -0.820171,
    -0.0498012, -0.36451, -0.69369, 0.0132941, -0.385052, -0.702267, -0.0768254,
    -0.412879, -0.427606, -0.0487662, -0.0715204, -0.507299, -0.0591063,
    -0.239716, -0.44768, 0.587473, -0.221669, -0.536449, 0.565918, -0.257327,
    -0.547434, 0.038253, -0.425081, -0.586099, 0.0134218, -0.4891, -0.628819,
    0.00562227, -0.418062, -0.597192, 0.0754029, -0.40295, -0.964312, 0.353726,
    -0.154789, -0.957239, 0.27585, -0.284978, -0.0791741, 0.289738, -0.460523,
    -0.0841531, 0.461638, -0.38083, -0.461791, 0.0301307, 0.0100383, -0.328757,
    0.0268074, 0.0515851, -0.439674, 0.130893, 0.0544829, -0.79568, 0.767302,
    -0.324921, -0.778414, 0.788928, -0.222686, -0.748408, 0.757997, -0.329629,
    -0.841218, 0.849887, -0.636316, -0.824305, 0.783463, -0.68228, -0.858832,
    0.738953, -0.517374, -0.594373, -0.0267504, -0.0225925, -0.636962,
    -0.0583844, -0.0144624, -0.583022, -0.0834778, -0.0271014, -0.984898,
    0.569322, -0.0590433, -0.177149, -0.0846412, -0.310653, -0.915701, 0.229126,
    -0.121924, -0.672066, 0.645504, -0.291708, -0.638373, 0.593932, -0.212484,
    -0.644365, 0.591017, -0.321883, -0.529702, 0.252894, -0.591916, -0.395891,
    0.311264, -0.601964, -0.42512, 0.573103, -0.121076, -0.366064, 0.503048,
    -0.0347934, -0.784531, 0.816225, -0.743724, -0.808959, 0.745528, -0.651364,
    -0.410547, 0.83578, -0.426685, -0.44592, 0.815239, -0.425233, -0.399336,
    0.902614, -0.533979, -0.777909, 0.609839, -0.0402916, -0.717759, 0.693426,
    -0.122913, -0.80084, 0.686643, -0.0246935, -0.358665, 0.14409, 0.0806618,
    -0.321463, 0.423908, -0.0182298, -0.227659, 0.373822, 0.0194127, -0.916908,
    0.759729, -0.107467, -0.896805, 0.776015, -0.270109, -0.601583, -0.0930387,
    -0.526168, -0.639806, -0.0888425, -0.445457, -0.654227, -0.0604027,
    -0.48086, -0.542842, 0.770856, -0.325737, -0.661811, 0.534612, -0.12094,
    -0.599714, 0.559446, -0.153733, -0.728672, 0.415041, -0.472436, -0.685438,
    0.551171, -0.406021, -0.558206, 0.453584, -0.469122, -0.747967, 0.455793,
    -0.0564595, -0.864708, 0.656987, -0.376901, -0.810058, 0.551059, -0.400093,
    -0.938137, 0.553625, -0.354145, -0.0388539, 0.220025, -0.0896297,
    -0.0101219, 0.331728, -0.177151, -0.10364, 0.315041, -0.0140217, -0.818414,
    -0.0912096, -0.350225, -0.131917, 0.168543, -0.0125575, -0.206961, 0.221338,
    0.0494217, -0.26666, 0.0943578, 0.058659, -0.812765, 0.842622, -0.444555,
    -0.780977, 0.881675, -0.652898, -0.775348, 0.697993, -0.389595, -0.748449,
    0.650654, -0.370866, -0.42297, -0.0891472, -0.487016, -0.648771, 0.197957,
    -0.455519, -0.477548, 0.149442, -0.602194, -0.268744, 0.212397, -0.569771,
    -0.325719, 0.0381998, -0.550472, -0.678079, 0.0358655, -0.217972, -0.735792,
    0.0489252, -0.307658, -0.722688, -0.0829705, -0.0604202, -0.762806,
    -0.0874325, -0.190754, -0.627895, -0.0824861, -0.189261, -0.804401,
    0.897812, -0.743505, -0.644878, -0.089789, -0.307176, -0.574541, -0.0747263,
    -0.552588, -0.392237, -0.0547159, -0.512731, -0.13429, 0.0979067,
    -0.0175079, -0.82694, 0.698337, -0.465055, -0.872138, 0.829327, -0.442934,
    -0.323407, -0.0751641, -0.438973, -0.95237, 0.466922, -0.168932, -0.938147,
    0.453348, -0.0694609, -0.29077, -0.0415096, -0.107601, -0.364703, -0.070262,
    -0.0408325, -0.503214, 0.545657, -0.367467, -0.550749, -0.092649, -0.219278,
    -0.847147, 0.417873, -0.0607855, -0.872994, 0.767082, -0.434049, -0.499704,
    0.0200285, 0.0368616, -0.314467, -0.0434459, 0.00419119, -0.777155,
    -0.0446515, -0.208837, -0.838733, -0.0735616, -0.260251, 0.0238922,
    -0.0392275, -0.240187, -0.406623, 0.884582, -0.465856, -0.490193, 0.884302,
    -0.424949, -0.504027, 0.815423, -0.340754, -0.294628, -0.0732328, -0.159655,
    -0.686472, 0.854134, -0.347752, -0.51239, -0.0028459, -0.528107, 0.00559717,
    0.202735, -0.206824, -0.863278, 0.619298, 0.0511967, -0.945365, 0.648727,
    -0.0127517, -0.924566, 0.560931, 0.0386811, -0.52729, 0.0639099, -0.070851,
    -0.494646, 0.141072, -0.0174713, -0.216332, -0.0809712, -0.464655,
    -0.526363, -0.0593939, 0.0618028, -0.44061, 0.0182767, -0.551365, -0.517735,
    0.0390832, -0.0390427, 0.0158916, 0.189672, -0.193658, -0.722876, 0.0178801,
    -0.120796, -0.803493, -0.0195635, -0.0970529, -0.716806, -0.00571346,
    -0.00574578, -0.203254, -0.0762782, -0.0285964, -0.491216, -0.0844883,
    0.0261611, -0.796672, -0.0919211, -0.314906, -0.71564, -0.0148721,
    -0.213196, -0.767173, -0.0593981, -0.177053, -0.592595, 0.843152, -0.427761,
    -0.697106, 0.776599, -0.246943, -0.685667, 0.720332, -0.237985, -0.574399,
    0.878904, -0.339398, -0.815132, -0.0112156, -0.286731, -0.762615, 0.858316,
    -0.732655, -0.11158, -0.0794683, -0.190668, -0.0670924, -0.0195028,
    -0.370157, -0.757642, 0.776287, -0.501183, -0.76109, -0.0708497, 0.00232475,
    -0.795761, -0.0863904, -0.0996902, -0.725957, 0.770762, -0.129999,
    0.0277527, 0.011568, -0.333469, -0.892954, 0.478146, 0.0259051, -0.766814,
    0.898703, -0.769792, -0.618221, 0.79396, -0.294717, -0.938286, 0.454438,
    -0.291115, -0.695525, 0.10995, -0.101053, -0.328259, 0.38764, 0.000231126,
    -0.931935, 0.431214, -0.148045, -0.547973, -0.0622686, -0.110368, -0.763964,
    0.486888, -0.0541329, -0.613453, 0.728631, -0.339925, -0.496122, 0.858217,
    -0.467581, -0.697229, 0.70526, -0.336147, -0.236829, 0.0103654, 0.00531717,
    -0.836014, 0.745763, -0.0485735, -0.984581, 0.493671, -0.0224734,
  ],
};