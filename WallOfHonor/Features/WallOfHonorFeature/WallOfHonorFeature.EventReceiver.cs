using System;
using System.Runtime.InteropServices;
using System.Security.Permissions;
using Microsoft.SharePoint;
using System.Linq;

namespace WallOfHonor.Features.WallOfHonorFeature
{
    /// <summary>
    /// This class handles events raised during feature activation, deactivation, installation, uninstallation, and upgrade.
    /// </summary>
    /// <remarks>
    /// The GUID attached to this class may be used during packaging and should not be modified.
    /// </remarks>

    [Guid("df87d0a7-150a-46ff-8f4a-143c1b4e01a0")]
    public class WallOfHonorFeatureEventReceiver : SPFeatureReceiver
    {
        public override void FeatureActivated(SPFeatureReceiverProperties properties)
        {
            var web = (properties.Feature.Parent as SPSite).RootWeb;

            string groupName = "WOFHonorGroup";
            string listName = "WallOfHonorList";
            try
            {
                if (!GroupExistsInSiteCollection(web, groupName))
                {
                    web.SiteGroups.Add(groupName, web.CurrentUser, web.CurrentUser, "Группа для редактирования доски почета");
                    web.AssociatedGroups.Add(web.SiteGroups[groupName]);
                    web.Update();
                }

                SPUser allUsers = web.AllUsers[@"c:0(.s|true"];
                SPRoleAssignment roleAssignmentEdit = new SPRoleAssignment(web.SiteGroups[groupName]);
                SPRoleAssignment roleAssignmentRead = new SPRoleAssignment((SPPrincipal)allUsers);
                SPRoleDefinition roleDefinitionEdit = web.RoleDefinitions.GetByType(SPRoleType.Contributor);
                SPRoleDefinition roleDefinitionRead = web.RoleDefinitions.GetByType(SPRoleType.Reader);
                roleAssignmentEdit.RoleDefinitionBindings.Add(roleDefinitionEdit);
                roleAssignmentRead.RoleDefinitionBindings.Add(roleDefinitionRead);

                if (web.Lists.TryGetList(listName) == null)
                {
                    web.AllowUnsafeUpdates = true;
                    SPListTemplate template = web.ListTemplates["WallOfHonorList"];
                    web.Lists.Add("Доска почета", "Доска почета", template);
                }

                SPList list = web.Lists["Доска почета"];
                if (!list.HasUniqueRoleAssignments)
                {
                    list.BreakRoleInheritance(false);
                    list.RoleAssignments.Add(roleAssignmentEdit);
                    list.RoleAssignments.Add(roleAssignmentRead);
                    list.Update();
                }
            }
            catch
            {
                //Лог
            }
        }

        private bool GroupExistsInSiteCollection(SPWeb web, string name)
        {
            return web.SiteGroups.OfType<SPGroup>().Count(g => g.Name.Equals(name, StringComparison.InvariantCultureIgnoreCase)) > 0;
        }


        public override void FeatureDeactivating(SPFeatureReceiverProperties properties)
        {
            var web = (properties.Feature.Parent as SPSite).RootWeb;
            string groupName = "WOFHonorGroup";
            try
            {
                SPGroupCollection collGroups = web.SiteGroups;
                collGroups.Remove(groupName);
            }
            catch
            {
                //Лог
            }
        }

        // Uncomment the method below to handle the event raised when a feature is upgrading.

        //public override void FeatureUpgrading(SPFeatureReceiverProperties properties, string upgradeActionName, System.Collections.Generic.IDictionary<string, string> parameters)
        //{
        //}
    }
}
