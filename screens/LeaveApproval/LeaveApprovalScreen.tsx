import { View, Text } from 'react-native'
import React from 'react'
import GlobalStyles from '../../shared/GlobalStyles'
import DateService from '../../services/DateService';
import { ApproveRejectLeave, GetLeavesForApproval, LeaveStatus } from '../../services/LeaveApprovalService';
import { BaseProps } from '../../App';
import Loader from '../../components/atom/Loader';
import FilterPanelWithDates from '../../components/organisms/FilterPanelWithDates';
import LeaveApprovalTemplate from '../../components/templates/LeaveApproval/LeaveApprovalTemplate';
import ViewModal from '../../components/organisms/ViewModal';
import FormGroup from '../../components/molecules/FormGroup';
import { LearnMoreLinks } from 'react-native/Libraries/NewAppScreen';
import FormGroupDDL from '../../components/molecules/FormGroupDDL';
import { DropDownModel } from '../../components/atom/DropDownModalSelector';

export default function LeaveApprovalScreen(props: BaseProps) {
    const { navigation } = props;


    const defaultToDate = new Date();
    const monthsDay = DateService.getFirstAndLastDateByDate(new Date());

    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const [listLeaves, setListLeaves] = React.useState<any[]>([]);
    const [fromDate, setFromDate] = React.useState<string>(monthsDay.firstDayStr);
    const [toDate, setToDate] = React.useState<string>(defaultToDate.toDateString());

    const [showModal, setShowModal] = React.useState(false);
    const [approvalRemarks, setApprovalRemarks] = React.useState('');
    const [isApproved, setIsApproved] = React.useState<boolean | null>(null);

    const [selectedLeaveDetail, setSelectedLeaveDetail] = React.useState<any>({});

    const [selectedLeaveStatusFilter, setSelectedLeaveStatusFilter] = React.useState('Pending');


    const listLeaveStatus: DropDownModel[] = [
        {
            key: "Pending",
            label: "Pending"
        },
        {
            key: "Approved",
            label: "Approved"
        },
        {
            key: "Reject",
            label: "Reject"
        }
    ]
    React.useEffect(() => {
        getLeavesForApprovalByStatus("Pending");
    }, [])

    const getLeavesForApprovalByStatus = async (leaveStatus: LeaveStatus) => {
        try {
            setIsLoading(true);
            const res = await GetLeavesForApproval(null, null, leaveStatus);
            const data = res.data;
            setIsLoading(false);

            setListLeaves(data.Result.list);
            console.log(data.Result.list, "data-GetLeaves");

        } catch (e) {
            setIsLoading(false);
        }
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getLeavesForApprovalByStatus("Pending");
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    const onApproveClick = (selecedItem: any) => {
        setSelectedLeaveDetail(selecedItem);
        // alert('onApproveClick');
        setShowModal(true);
        setIsApproved(true);
    }
    const onRejectClick = (selecedItem: any) => {
        setSelectedLeaveDetail(selecedItem);
        setShowModal(true);
        setIsApproved(false);

        // alert('onRejectClick');
    }

    const onSubmitClick = async () => {

        try {
            const leaveRequestId = selectedLeaveDetail?.LeaveRequestId;
            const status = isApproved ? "Approved" : "Reject";
            setIsLoading(true);
            const res = await ApproveRejectLeave(leaveRequestId, status, approvalRemarks);
            const data = res.data;
            setIsLoading(false);
            if (data.IsSuccess) {
                setApprovalRemarks('');
                setShowModal(false);
                getLeavesForApprovalByStatus("Pending");
                alert(data.Msg);
                // navigateToLeave(navigation, PageNames.ADD_LEAVE);
            } else {
                alert(data.Msg);
            }
        } catch (e) {
            setIsLoading(false);
            alert("Error : " + e);
        }

    }

    if (isLoading)
        return <Loader />


    return (
        <View style={GlobalStyles.screenContainer}>
            {/* <FilterPanelWithDates
                fromDate={fromDate}
                setFromDate={setFromDate}
                toDate={toDate}
                setToDate={setToDate}
                onSubmit={() => {
                    getLeavesForApprovalByStatus("Pending");
                }}
                loading={isLoading}
            /> */}
            {/* <Text>{JSON.stringify(listLeaves)}</Text> */}
            <FormGroupDDL
                listKeyLable={listLeaveStatus}
                placeholder={selectedLeaveStatusFilter}
                hideLabel
                onChange={(key, label) => {
                    setSelectedLeaveStatusFilter(key);
                    let val: LeaveStatus = "Pending";
                    if (key == "Pending") {
                        val = "Pending";
                    } else if (key == "Approved") {
                        val = "Approved";
                    } else if (key == "Reject") {
                        val = "Reject";
                    }
                    getLeavesForApprovalByStatus(val);
                    // setSelectedLeaveTypeVal(key);
                }}
            />
            <ViewModal title='Confirmation' isVisible={showModal} setIsVisible={setShowModal} submitTextOverride={isApproved ? "Approve" : "Reject"}
                onSubmit={onSubmitClick}
            >
                <View>
                    <FormGroup label='Remarks' multiline val={approvalRemarks} setVal={setApprovalRemarks} />
                </View>
            </ViewModal>

            <LeaveApprovalTemplate
                listData={listLeaves}
                navigation={navigation}
                onApproveClick={onApproveClick}
                onRejectClick={onRejectClick} />

        </View >
    )
}