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
        title: 'Product',
        shortHand: 'P',
        Component: MenuItem,
        to: '/a/product',
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
                to: '/a/type/discount'
            },
            {
                title: 'Processed',
                Component: MenuItem,
                to: '/a/type/product-category'
            },
        ]
    },
    {
        title: 'Employee',
        shortHand: 'E',
        Component: MenuItem,
        to: '/a/employee',
        CollapsedIcon: LetterIcon,
    },
    {
        title: 'Customer',
        shortHand: 'C',
        Component: MenuItem,
        to: '/a/customer',
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