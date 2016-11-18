{
  "targets": [
    {      
      "target_name": "omniwear_addon",
      "sources": [
        "omniwear_wrapper.cc",
        "omniwear.h",
        "hid.h"
      ],
      "include_dirs": [
        "../omniwear-driver"
      ],
      "libraries": [
        "-lomniwear_sdk"
      ]
    }
  ]
}