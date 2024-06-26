import { useSelector } from 'react-redux';

import { authSelectors } from 'redux/app/auth';
import { diarySelectors } from 'redux/app/diaryPerDay';

import {
  InfoList,
  InfoListItem,
  ListTitle,
  Span,
  Thumb,
} from './DailyCalorieIntake.styles';

export const DailyCalorieIntake = ({ date }) => {
  const dailyCalCount = useSelector(authSelectors.getUserAdviceCalorie);
  const products = useSelector(diarySelectors.getDiaryProducts);
  const isAnyProducts = products !== null && products.length > 0;
  let kcalConsumed = 0;

  if (isAnyProducts) {
    kcalConsumed = products
      .map(({ product, weightGrm }) => (weightGrm / 100) * product.calories)
      .reduce((p, c) => p + c, 0);
  }

  let kcalLeft = dailyCalCount - kcalConsumed;
  let percOfNorm = ~~((kcalConsumed / dailyCalCount) * 100);

  if (kcalLeft < 0) {
    kcalLeft = '000';
  }

  return (
    <Thumb>
      <ListTitle>Summary for {date}</ListTitle>
      <InfoList>
        <InfoListItem>
          <span>Left</span>
          <span>{Math.round(kcalLeft) || '000'} kcal</span>
        </InfoListItem>
        <InfoListItem>
          <span>Consumed</span>
          <span>{Math.round(kcalConsumed) || '000'} kcal</span>
        </InfoListItem>
        <InfoListItem>
          <span>Daily rate</span>
          <span>{dailyCalCount || '000'} kcal</span>
        </InfoListItem>
        <InfoListItem>
          <span>n% of normal</span>
          <Span upperHandred={Math.round(percOfNorm) > 100}>
            {percOfNorm || '000'} %
          </Span>
        </InfoListItem>
      </InfoList>
    </Thumb>
  );
};
