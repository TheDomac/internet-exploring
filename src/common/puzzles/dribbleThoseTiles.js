const puzzle = {
  id: "pa88HuCtT1DW3OYoPuOI",
  name: "Dribble Those Tiles",
  rebuses: [
    {
      clues: [
        {
          solutionInfo: {
            possibleSolutions: [],
            solvedText: "",
            type: "text",
          },
          style: {
            width: "calc(33% - 10px)",
          },
          subtext: "",
          dependsOn: [],
          helperText:
            "Combine the shorthands for these elements using the periodic table.",
          clueValues: [
            {
              id: "af38a03a-61e7-4d9d-8d2d-454c71fcc20e",
              style: {
                width: "calc(100% - 10px)",
              },
              subtext: "",
              value: "Argon",
              type: "text",
            },
            {
              style: {
                width: "calc(100% - 10px)",
              },
              subtext: "",
              type: "text",
              value: "Germanium",
              id: "d3b39919-8caf-42b4-9b1c-ac2e5f6ec237",
            },
            {
              style: {
                width: "calc(100% - 10px)",
              },
              type: "text",
              subtext: "",
              id: "529979d5-f1a9-43fc-8bb1-65ac9af42d6a",
              value: "Nitrogen",
            },
            {
              style: {
                width: "calc(100% - 10px)",
              },
              value: "Titanium",
              type: "text",
              subtext: "",
              id: "07f0617b-b429-43a8-96cc-381a22156eb9",
            },
            {
              type: "text",
              style: {
                width: "calc(100% - 10px)",
              },
              subtext: "",
              value: "Sodium",
              id: "2daf8feb-c442-4adf-9543-4cffcf8fca08",
            },
          ],
          id: "3232ad5b-6a7d-4a75-8205-4b1895c786c1",
          clueGroup: 0,
        },
      ],
      style: {},
      solutionInfo: {
        type: "text",
        solvedText: "Argentina",
        possibleSolutions: [
          {
            id: "7d66fd1b-4292-4b67-9360-d74968f23677",
            value: "Argentina",
          },
        ],
      },
      id: "82df311f-26d2-4760-9576-dc00fbeb84ab",
    },
    {
      style: {},
      id: "3c1d0b0e-ebcb-4d03-9c05-7906b22eadce",
      solutionInfo: {
        solvedText: "Football",
        possibleSolutions: [
          {
            id: "1e60b188-c757-4314-8094-f2e4c2c3bd79",
            value: "Football",
          },
          {
            value: "Foot-ball",
            id: "7d83db42-a320-4212-8a3e-82f5e38d413e",
          },
          {
            value: "The Foot-ball Play",
            id: "7e61a4b7-24a5-43e8-9610-e6b5175ce44a",
          },
        ],
        type: "text",
      },
      clues: [
        {
          clueGroup: 0,
          subtext: "",
          style: {
            width: "calc(66% - 10px)",
          },
          clueValues: [
            {
              value: "FootballPictureSlider",
              id: "56d4ffc2-ba54-44ea-b04d-08a6384cdb77",
              subtext: "",
              type: "customComponent",
              style: {
                width: "calc(100% - 10px)",
              },
            },
          ],
          id: "19a3b33f-714f-4fe8-b682-beb2cbeac4c6",
          helperText:
            "Click on pieces of image above, below, on the left or on the right of the hole to move the pieces. Get the full picture to solve the clue.",
          dependsOn: [],
          solutionInfo: {
            solvedText: "",
            type: "customComponent",
            possibleSolutions: [
              {
                id: "7ec3c79b-4e54-4369-91d1-820f9c32c1b4",
                value: "",
              },
            ],
          },
        },
        {
          style: {
            width: "calc(33% - 10px)",
          },
          solutionInfo: {
            possibleSolutions: [],
            solvedText: "",
            type: "text",
          },
          id: "14e22d34-1db1-4bf7-b29c-c6e74a7b6ab1",
          clueGroup: 0,
          dependsOn: [
            {
              id: "3b66308f-9edc-4614-8db8-2ac37ebd3dc4",
              value: "19a3b33f-714f-4fe8-b682-beb2cbeac4c6",
            },
          ],
          clueValues: [
            {
              id: "c5a24013-6b82-4af8-bea1-92a7dc4c1df3",
              style: {
                width: "calc(100% - 10px)",
              },
              type: "text",
              subtext: "",
              value: "Alexander Carse, Scotland, c. 1830.",
            },
          ],
          subtext: "",
          helperText:
            "What sport is displayed on this painting whose author is Alexander Carse?",
        },
      ],
    },
    {
      id: "f142d421-9c38-4df9-a274-367e92bc1ec5",
      clues: [
        {
          dependsOn: [],
          style: {
            width: "calc(100% - 10px)",
            filter: "blur(27px)",
          },
          clueGroup: 0,
          subtext: "",
          helperText: "Solve the minesweeper and copy the letters.",
          id: "9d120b63-cd86-40d1-b67d-f2ea442d8a31",
          solutionInfo: {
            solvedText: "ASCII",
            type: "text",
            possibleSolutions: [
              {
                value: "ASCII",
                id: "11114d2-76d6-40dd-b540-455d56491c45",
              },
            ],
          },
          clueValues: [
            {
              subtext: "",
              value: "ASCIIMinesweeper",
              style: {
                width: "calc(100% - 10px)",
              },
              id: "2375a763-9bfc-44a2-9e66-2e1d6845d985",
              type: "customComponent",
            },
          ],
        },
        {
          dependsOn: [
            {
              value: "9d120b63-cd86-40d1-b67d-f2ea442d8a31",
              id: "11114c72-d8d2-44d0-9805-a18c98910340",
            },
          ],
          style: {
            width: "calc(100% - 10px)",
            filter: "blur(27px)",
          },
          clueGroup: 0,
          subtext: "",
          helperText: "Convert this ASCII code to letters.",
          id: "2222b63-cd86-40d1-b67d-f2ea442d8a31",
          solutionInfo: {
            solvedText: "",
            type: "text",
            possibleSolutions: [],
          },
          clueValues: [
            {
              subtext: "",
              value:
                "73 116 97 108 105 97 110 32 102 111 111 116 98 97 108 108 32 99 108 117 98 32 119 105 116 104 32 108 101 116 116 101 114 32 78 32 105 110 32 108 111 103 111 ",
              style: {
                width: "calc(100% - 10px)",
              },
              id: "333363-9bfc-44a2-9e66-2e1d6845d985",
              type: "text",
            },
          ],
        },
      ],
      solutionInfo: {
        possibleSolutions: [
          {
            value: "Napoli",
            id: "f8f714d2-76d6-40dd-b540-455d56491c45",
          },
        ],
        type: "text",
        solvedText: "Napoli",
      },
      style: {},
    },
    {
      id: "c3203a36-4e4f-4d72-9c80-32eded927821",
      style: {},
      solutionInfo: {
        type: "text",
        solvedText: "Maradona",
        possibleSolutions: [
          {
            id: "994f3cdb-5237-4723-bbd7-b6c9c29cba11",
            value: "Maradona",
          },
          {
            id: "c8834676-0925-4022-a35a-5f83c86051a3",
            value: "Diego Maradona",
          },
        ],
      },
      clues: [
        {
          clueGroup: 1,
          id: "b2a1b074-c35c-47b1-871b-66699a55b7a1",
          clueValues: [
            {
              value: "Argentina",
              style: {
                width: "calc(100% - 10px)",
              },
              id: "6243658a-ed6c-416a-82ac-2727baa3f4b1",
              type: "text",
              subtext: "",
            },
          ],
          solutionInfo: {
            possibleSolutions: [],
            solvedText: "",
            type: "text",
          },
          subtext: "",
          helperText: "It's a football player born in Argentina.",
          style: {
            width: "calc(33% - 10px)",
          },
          dependsOn: [],
        },
        {
          dependsOn: [],
          clueGroup: 1,
          clueValues: [
            {
              subtext: "",
              type: "text",
              id: "145ba89a-2181-42ff-be97-46595fb8891a",
              style: {
                width: "calc(100% - 10px)",
              },
              value: "Football",
            },
          ],
          helperText: "It's a famous football legend.",
          solutionInfo: {
            type: "text",
            possibleSolutions: [],
            solvedText: "",
          },
          style: {
            width: "calc(33% - 10px)",
          },
          subtext: "",
          id: "ebfb0943-2e5a-4acf-8fc9-18620c1fc31a",
        },
        {
          clueValues: [
            {
              type: "text",
              id: "86e92d0a-97ee-402a-a600-c79ba7c97d53",
              value: "Napoli",
              style: {
                width: "calc(100% - 10px)",
              },
              subtext: "",
            },
          ],
          id: "01b91051-8860-4ce1-845b-5d49b3404bad",
          helperText: "",
          subtext: "",
          clueGroup: 1,
          style: {
            width: "calc(33% - 10px)",
          },
          solutionInfo: {
            possibleSolutions: [],
            solvedText: "",
            type: "text",
          },
          dependsOn: [],
        },
      ],
    },
  ],
};

export default puzzle;
