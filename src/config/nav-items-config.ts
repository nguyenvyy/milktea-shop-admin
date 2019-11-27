import { SubMenu } from "../components/NavBar/SubMenu/SubMenu";
import { MenuItem } from "../components/NavBar/MenuItem/MenuItem";
import { LetterIcon } from '../components/NavBar/LetterIcon/LetterIcon';

export const navItems = [
    {
        title: 'Profile',
        shortHand: 'P',
        Component: MenuItem,
        to: '/a/user-profile',
        CollapsedIcon: LetterIcon,
    },
    {
        title: 'Order',
        shortHand: 'O',
        Component: SubMenu,
        to: '/a/order',
        CollapsedIcon: LetterIcon,
        items: [
            {
                title: 'Processing',
                Component: MenuItem,
                to: '/a/order/processing'
            },
            {
                title: 'Processed',
                Component: MenuItem,
                to: '/a/order/processed'
            },
        ]
    },
    {
        title: 'Product',
        shortHand: 'P',
        Component: MenuItem,
        to: '/a/product',
        CollapsedIcon: LetterIcon,
    },
    {
        title: 'Employee',
        shortHand: 'E',
        Component: MenuItem,
        to: '/a/employee',
        CollapsedIcon: LetterIcon,
    },
    {
        title: 'Membership',
        shortHand: 'M',
        Component: MenuItem,
        to: '/a/membership',
        CollapsedIcon: LetterIcon,
    },
    {
        title: 'Feedback',
        shortHand: 'F',
        Component: MenuItem,
        to: '/a/feedback',
        CollapsedIcon: LetterIcon,
    },
    {
        title: 'Report',
        shortHand: 'R',
        Component: MenuItem,
        to: '/a/report',
        CollapsedIcon: LetterIcon,
    },
    {
        title: 'Type',
        shortHand: 'T',
        Component: SubMenu,
        to: '/a/type',
        CollapsedIcon: LetterIcon,
        items: [
            {
                title: 'Discounts',
                Component: MenuItem,
                to: '/a/type/discount'
            },
            {
                title: 'Product Category',
                Component: MenuItem,
                to: '/a/type/product-category'
            },
            {
                title: 'VIPs',
                Component: MenuItem,
                to: '/a/type/vip'
            },
            {
                title: 'Orther',
                Component: MenuItem,
                to: '/a/type/orther'
            },
        ]
    }
]