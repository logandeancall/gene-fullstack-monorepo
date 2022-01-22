import React, { useState } from 'react';

import {
  Box,
  Text,
  Flex,
  useRadioGroup,
  useCheckboxGroup,
} from '@chakra-ui/react';
import theme from 'ui/theme';
import { GodCommandsRaphaelText } from 'ui/atoms/text/EnochGodCommandsRaphaelText';
import { RadioCard } from 'ui/atoms/radio/RadioCard';
import { SubHeader } from 'ui/atoms/header';
import { AlertArea } from 'ui/atoms/alert-area/AlertArea';
import { Button } from 'ui/atoms/button/Button';

import AlgorithmSvg from 'ui/icons/svg/AlgorithmSvg';

const color = theme.colors.teal[`500`];

const SurveyQuestionsData = [
  {
    title: `Do you solemnly swear to answer the following questions truthfully?`,

    choices: [`I do`, `I do not`],

    type: `radio`,
  },

  {
    title: `If you had the choice between a rather minimal game (less features, possible bugs) that you could play today vs a more full fledged game that you could play before a public release, which would you choose?`,

    choices: [
      `Today - A simple game where I can gain experience while walking`,

      `Near Future - A more full fledged game including battling, habitats, evolution, & augments`,

      `Neither - I would prefer to wait for a public release`,
    ],

    type: `radio`,
  },

  {
    title: `Which features made you want to play Genopets the most? Please rank 1-6 with 1 being the most`,

    choices: [
      `Building an active lifestyle`,

      `Nurturing and customizing your Genopet`,

      `Exploring the Genoverse`,

      `Battling`,

      `Crafting items and accessories`,

      `Earning Tokens`,
    ],

    type: `ranked`,
  },

  {
    title: `What level of feedback are you willing to give?`,

    choices: [
      `None - I’m not interested in providing feedback`,

      `Minimal - I can share some thoughts on discord polls if I see them`,

      `Moderate - I’ll respond to email surveys if you send them out`,

      `In Depth - I can take screenshots or record my screen to share thoughts & suggestions`,

      `Maximum - I’d love to get on a zoom call with the genopets team and do a user interview`,
    ],

    type: `radio`,
  },

  {
    title: `Which of the following best describes your interests?`,

    choices: [`Gaming`, `Crypto`, `Active Lifestyle`, `None of these`],

    type: `radio`,
  },

  {
    title: `What device will you play Genopets on?`,

    choices: [`iPhone`, `Android`, `Neither`],

    type: `radio`,
  },

  {
    title: `How long ago was your phone model released?`,

    choices: [`<1 year`, `1-2 years`, `2-4 years`, `4+ years`],

    type: `radio`,
  },

  {
    title: `How experienced are you with crypto? (Select all that apply)`,

    choices: [
      `DeFi`,

      `IDOs`,

      `NFTs`,

      `GameFi`,

      `Trading on Coinbase, FTX, or Binance`,

      `wagmi`,
    ],

    type: `checkbox`,
  },

  {
    title: `Have you played any other Play-to-Earn games such as Axie Infinity or Thetan Arena?`,

    choices: [`Yes`, `No`],

    type: `radio`,
  },

  {
    title: `Do you have any technical expertise? (Select all that apply)`,

    choices: [
      `UI/UX Design`,

      `Sound Design / Music Production`,

      `3D Artist`,

      `2D Artist`,

      `Mobile/Web Development`,

      `Blockchain Development`,

      `Solana Development`,

      `Game Design`,

      `Game Story Writing`,

      `None of the above`,
    ],

    type: `checkbox`,
  },
];

interface QuestionProps {
  title?: string;
  choices: string[];
  type: string;
  index: number;
  onAnswer?: (response: string[], index: number) => void;
  currentAnswer: string[];
}

const AnswerGroup = ({
  type,
  onAnswer,
  currentAnswer,
  choices,
  index,
}: QuestionProps) => {
  const { getRootProps: getRadioRootProps, getRadioProps } = useRadioGroup({
    name: `answer-group=${index}`,
    onChange: (selected) => onAnswer?.([selected], index),
  });

  const { getCheckboxProps } = useCheckboxGroup({
    onChange: (selected) => onAnswer?.(selected as string[], index),
  });

  const group = type === 'radio' ? getRadioRootProps() : {};

  return (
    <Flex {...group} direction="column" justify="flex-end" gap={4}>
      {choices.map((choice, i) => {
        const leftText =
          type === 'ranked'
            ? currentAnswer.indexOf(choice) + 1 || '-'
            : String.fromCharCode(97 + i);

        let props: any =
          type === 'radio'
            ? getRadioProps({
                value: choice,
              })
            : getCheckboxProps({
                name: `answer-group=${index}`,
                value: choice,
              });

        return (
          <RadioCard
            key={leftText + choice}
            {...props}
            justify="left"
            type={type}
            leftText={leftText}
            rightText={choice}
          />
        );
      })}
    </Flex>
  );
};

const Question = ({
  title = ``,
  choices = [],
  type = ``,
  index = 0,
  onAnswer,
  currentAnswer,
}: QuestionProps) => (
  <Box>
    <SubHeader
      letterSpacing="5px"
      fontFamily="neon-bold"
      fontSize="11px"
      marginBottom={1}
    >
      <strong>{`QUESTION ${index + 1}`}</strong>
    </SubHeader>
    <Text fontFamily="Avenir" color="white" marginBottom={2}>
      {title}
    </Text>
    <AnswerGroup
      onAnswer={onAnswer}
      currentAnswer={currentAnswer}
      type={type}
      choices={choices}
      index={index}
    />
  </Box>
);

type submitStatus = 'ready' | 'loading' | 'success' | 'error';

const SubmitStatus = ({ submitStatus }: { submitStatus: submitStatus }) => {
  switch (submitStatus) {
    case 'error':
      return (
        <Box>
          <AlertArea status="error">
            An unknown error occurred. Please try again later.
          </AlertArea>
        </Box>
      );
    case 'success':
      return (
        <Box>
          <AlertArea status="success">
            Your response was successfully sent!
          </AlertArea>
        </Box>
      );
    case 'loading':
    case 'ready':
    default:
      return null;
  }
};

type fieldValue = {
  title: string;
  type: string;
  values: string[];
};

const Survey = () => {
  const [submitStatus, setSubmitStatus] = useState('ready' as submitStatus);

  const [fieldValues, setFieldValues] = useState(
    SurveyQuestionsData.map(
      ({ title, type }) =>
        ({
          title,
          type,
          values: [],
        } as fieldValue),
    ),
  );

  const handleFieldValueUpdate = (response: string[], index: number) => {
    setFieldValues((items) =>
      items.map((item, itemIndex) =>
        itemIndex == index ? { ...item, values: response } : item,
      ),
    );
  };

  const onSubmit = () => {
    setSubmitStatus('loading');

    fetch('http://localhost:8080/survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(fieldValues),
    })
      .then((response) => {
        if (response.ok) {
          setSubmitStatus('success');
        } else {
          console.log('error', response);
          setSubmitStatus('error');
        }
      })
      .catch((error) => {
        setSubmitStatus('error');
        console.log('api error', error);
      })
      .finally(() => setTimeout(() => setSubmitStatus('ready'), 5000));
  };

  return (
    <Flex
      color={color}
      direction="column"
      gap={2}
      justify="flex-end"
      height="full"
    >
      <Flex mt={8} alignItems="center" gap={4}>
        <Box h="64px" w="64px">
          <AlgorithmSvg />
        </Box>
      </Flex>
      <SubHeader letterSpacing="initial">SURVEY</SubHeader>
      <GodCommandsRaphaelText />
      <Text fontFamily="Avenir" color="white" marginBottom={2}>
        Tell us a bit more about you and what you’re looking for in Genopets.
      </Text>
      <Flex direction="column" justify="flex-end" gap={8}>
        {SurveyQuestionsData.map((question, index) => (
          <Question
            onAnswer={handleFieldValueUpdate}
            key={question.title}
            {...question}
            index={index}
            currentAnswer={fieldValues[index]?.values || []}
          />
        ))}
        <SubmitStatus submitStatus={submitStatus} />
        <Button
          onClick={onSubmit}
          color="#ffd800"
          isLoading={submitStatus === 'loading'}
        >
          Submit & Complete
        </Button>
      </Flex>
    </Flex>
  );
};

export default Survey;
