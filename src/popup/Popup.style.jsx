import tw, { styled } from 'twin.macro';

export const PopupWrapper = styled.div`
  ${tw`
    w-[445px]
    h-[540px]
    p-5 
    overflow-y-scroll
  `}
`;

export const ItemWrapper = styled.div`
  ${tw`
    flex 
    w-full
    justify-between
  `}
`;

export const Title = styled.p`
  ${tw`
    text-2xl
  `}
`;
