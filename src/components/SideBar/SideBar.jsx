import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/app/auth';
import { DailyCalorieIntake } from 'components/DailyCalorieIntake';
import { Thumb, ProdThumb, List, Title, AltText } from './SideBar.styles';

export const SideBar = ({ date, kcalConsumed, calorie }) => {
  const notRecommendedProd = useSelector(authSelectors.getUserNotRecommendProd);

  return (
    <Thumb>
      <DailyCalorieIntake
        date={date.replace(/\./g, '/')}
        daylykCalCount={calorie}
        kcalConsumed={kcalConsumed}
      />

      <ProdThumb>
        <Title>Food not recommended</Title>

        {notRecommendedProd.length > 0 ? (
          <List>
            {notRecommendedProd?.map((product, i) => (
              <li key={i}>{product}</li>
            ))}
          </List>
        ) : (
          <AltText>
            Here will be displayed the products not recommended for you
          </AltText>
        )}
      </ProdThumb>
    </Thumb>
  );
};
